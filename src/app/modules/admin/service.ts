import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IPagination } from '../../../interfaces/paginationType'
import { IFilters } from '../student/contants'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IGenericResponse } from '../../../shared/constants'
import { User } from '../users/model'
import { adminSearchableFields } from './contants'
import { IAdmin } from './interface'
import { Admin } from './model'

const getAllAdmins = async (
    paginationOptions: IPagination,
    filter: IFilters,
  ): Promise<IGenericResponse<IAdmin[]> | null> => {
    const { page, limit, sortBy, sortOrder } = paginationOptions
    const { searchTerm, ...filters } = filter
  
    const paginate = calculatePagination({ page, limit, sortBy, sortOrder })
  
    const andCondition = []
  
    if (searchTerm) {
      andCondition.push({
        $or: adminSearchableFields.map((item: string, index: number) => ({
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
  
    const total = await Admin.countDocuments()
    const response = await Admin.find(finalConditions)
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
  
  const singleAdmin = async (id: string): Promise<IAdmin | null> => {
    const response = await Admin.findById(id).select({ _id: 0 })
    return response
  }
  
  const deleteAdmin = async (id: string) => {
    const ifExist = await Admin.findById(id)
    if (!ifExist) {
      throw new ApiError(400, 'This admin does not exist')
    }
  
    let deleteSuccess = false
  
    // transaction & rollback
    const session = await mongoose.startSession()
    //  session.startTransaction()
  
    try {
      await session.withTransaction(async () => {
        const res = await Admin.findByIdAndDelete([{ _id: id }], { session })
        
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
  
  const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
    let isExist = await Admin.findById(id)
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This id not found')
    }
  
    const { name, ...others } = payload
    console.log(name,others)
    let updatingAdminData: Partial<IAdmin> = { ...others }
  
    // Update the name properties if they exist in the payload
  
    // if (name && Object.keys(name).length > 0) {
    //   updatingAdminData.name = { ...isExist.name, ...name };
    // }
  
    if (name && Object.keys(name).length > 0) {
      // Object.keys(name).forEach((key) => {
      //   updatingAdminData['name'][key] = name[key];
      // });
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`
        ;(updatingAdminData as any)[nameKey] = name[key as keyof typeof name]
      })
    }
  
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      updatingAdminData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators for updates
      },
    )
  
    return updatedAdmin
  }

  export const adminService ={
    getAllAdmins,
    singleAdmin,
    deleteAdmin,
    updateAdmin
  }