import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IPagination } from '../../../interfaces/paginationType'
import { IFilters } from '../student/contants'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IGenericResponse } from '../../../shared/constants'
import { User } from '../users/model'
import { IFaculty } from './interface'
import { Faculty } from './model'
import { facultySearchableFields } from './contants'

const getAllFaculties = async (
    paginationOptions: IPagination,
    filter: IFilters,
  ): Promise<IGenericResponse<IFaculty[]> | null> => {
    const { page, limit, sortBy, sortOrder } = paginationOptions
    const { searchTerm, ...filters } = filter
  
    const paginate = calculatePagination({ page, limit, sortBy, sortOrder })
  
    const andCondition = []
  
    if (searchTerm) {
      andCondition.push({
        $or: facultySearchableFields.map((item: string, index: number) => ({
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
  
    const total = await Faculty.countDocuments()
    const response = await Faculty.find(finalConditions)
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
  
  const singleFaculty = async (id: string): Promise<IFaculty | null> => {
    const response = await Faculty.findById(id).select({ _id: 0 })
    return response
  }
  
  const deleteFaculty = async (id: string) => {
    const ifExist = await Faculty.findById(id)
    if (!ifExist) {
      throw new ApiError(400, 'This Faculty does not exist')
    }
  
    let deleteSuccess = false
  
    // transaction & rollback
    const session = await mongoose.startSession()
    //  session.startTransaction()
  
    try {
      await session.withTransaction(async () => {
        const res = await Faculty.findByIdAndDelete([{ _id: id }], { session })
        
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
  
  const updateFaculty = async (id: string, payload: Partial<IFaculty>) => {
    let isExist = await Faculty.findById(id)
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This id not found')
    }
  
    const { name, ...faculty } = payload
  
    let updatingFacultyData: Partial<IFaculty> = { ...faculty }
  
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
        ;(updatingFacultyData as any)[nameKey] = name[key as keyof typeof name]
      })
    }
  
  
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      updatingFacultyData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators for updates
      },
    )
  
    return updatedFaculty
  }

  export const facultyService ={
    getAllFaculties,
    singleFaculty,
    deleteFaculty,
    updateFaculty
  }