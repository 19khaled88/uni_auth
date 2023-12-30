import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/model'
import { IStudent } from '../student/interface'
import { IUser } from './interfaces'
import { User } from './model'
import { generateUserId, generate_Student_Id } from './utils'
import { Student } from '../student/model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IPagination } from '../../../interfaces/paginationType'
import { IFilters, studentSearchableFields } from '../student/contants'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IGenericResponse } from '../../../shared/constants'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  // if(user.role === 'student'){
  //     const id = await generate_Student_Id()
  //     user.id = id
  // }
  user.id = id
  if (!user.password) {
    user.password = config.default_password as string
  }

  if (!user.role) {
    user.role = config.default_role as string
  }

  const res = await User.create(user)
  if (!res) {
    throw new Error('Failed to create user')
  }
  return res
}

// with transation and rollback way
const createStudent = async (
  student: IStudent,
  userData: IUser,
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.default_password as string
  }

  //user role set
  if (!userData.role) {
    userData.role = config.default_role as string
  }

  //get academic semester info
  const academicSemesterInfo = await AcademicSemester.findById(
    student.academicSemester,
  )

  let newUserAllData = null

  // transaction & rollback
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    //generate student id
    const id = await generate_Student_Id(academicSemesterInfo)
    userData.id = id
    student.id = id

    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    //set student's _id into user's student reference
    userData.student = newStudent[0]._id

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicSemester',
        },
      ],
    })
  }

  return newUserAllData
}

const getAllStudents = async (
  paginationOptions: IPagination,
  filter: IFilters,
): Promise<IGenericResponse<IStudent[]> | null> => {
  const { page, limit, sortBy, sortOrder } = paginationOptions
  const { searchTerm, ...filters } = filter

  const paginate = calculatePagination({ page, limit, sortBy, sortOrder })

  const andCondition = []

  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map((item: string, index: number) => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filters).length) {
    andCondition.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const finalConditions = andCondition.length > 0 ? { $and: andCondition } : {}

  const sortCondition: { [key: string | number]: any } = {}

  if (paginate.sortBy && paginate.sortOrder) {
    sortCondition[paginate.sortBy] = paginate.sortOrder
  }

  const total = await Student.countDocuments()
  const response = await Student.find(finalConditions)
    .sort(sortCondition)
    .limit(paginate.limit)
    .skip(paginate.skip)
  return {
    meta: {
      page: paginate.page,
      limit: paginate.limit,
      total,
    },
    data: response,
  }
}

const singleStudent = async (id: string): Promise<IStudent | null> => {
  const response = await Student.findById(id).select({ _id: 0 })
  return response
}

const deleteStudent = async (id: string) => {
  const ifExist = await Student.findById(id)
  if (!ifExist) {
    throw new ApiError(400, 'This student does not exist')
  }

  let deleteSuccess = false

  // transaction & rollback
  const session = await mongoose.startSession()
  //  session.startTransaction()

  try {
    await session.withTransaction(async () => {
      const res = await Student.findByIdAndDelete([{ _id: id }], { session })
      
      await User.findOneAndDelete({ id: res?.id }, { session })
    })

    deleteSuccess = true
  } catch (error) {
    
    await session.endSession()
    throw error
  } finally {
    await session.endSession()
  }

  return deleteSuccess
}

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  let isExist = await Student.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This id not found')
  }

  const { name, guardian, ...student } = payload

  let updatingStudentData: Partial<IStudent> = { ...student }

  // Update the name properties if they exist in the payload

  // if (name && Object.keys(name).length > 0) {
  //   updatingStudentData.name = { ...isExist.name, ...name };
  // }

  if (name && Object.keys(name).length > 0) {
    // Object.keys(name).forEach((key) => {
    //   updatingStudentData['name'][key] = name[key];
    // });
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updatingStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`
      ;(updatingStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    updatingStudentData,
    {
      new: true, // Return the updated document
      runValidators: true, // Run validators for updates
    },
  )

  return updatedStudent
}

export const userService = {
  createUser,
  createStudent,
  singleStudent,
  getAllStudents,
  deleteStudent,
  updateStudent,
}
