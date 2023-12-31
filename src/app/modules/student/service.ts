import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/model'
import { IStudent } from '../student/interface'
import { Student } from '../student/model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IPagination } from '../../../interfaces/paginationType'
import { IFilters, studentSearchableFields } from '../student/contants'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IGenericResponse } from '../../../shared/constants'
import { User } from '../users/model'

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

  export const studentService ={
    getAllStudents,
    singleStudent,
    deleteStudent,
    updateStudent
  }