import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { calculatePagination } from '../../../helpers/paginationCalculate'
import { IFilters, IPagination } from '../../../interfaces/paginationType'
import { IGenericResponse } from '../../../shared/constants'
import { academicSearchableFields, academicSemesterTitleCodeMapper } from './constants'
import { IAcademicSemester } from './interface'
import { AcademicSemester } from './model'

const createAcademicSemester = async (
    data: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
    if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
        throw new ApiError(
            status.CONFLICT,
            'Semester code not match the semester year',
        )
    }
    const res = await AcademicSemester.create(data)
    if (!res) {
        throw new Error('Failed to create academic semester')
    }
    return res
}

const allSemester = async (
    paginationOptions: IPagination,
    filter: IFilters,
): Promise<IGenericResponse<IAcademicSemester[]> | null> => {
    const { page, limit, sortBy, sortOrder } = paginationOptions
    const { searchTerm, ...filters } = filter

    const paginate = calculatePagination({ page, limit, sortBy, sortOrder })

    //   const andCondition = [
    //     {
    //       $or: [
    //         {
    //           title: {
    //             $regex: searchTerm,
    //             $options: 'i',
    //           },
    //         },
    //       ],
    //     },
    //   ]

    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            $or: academicSearchableFields.map((item: string, index: number) => ({
                [item]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

   

    if (Object.keys(filters).length) {
        andCondition.push({
            $and: Object.entries(filters).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const finalConditions = andCondition.length > 0 ? { $and: andCondition } : {}

    const sortCondition: { [key: string | number]: any } = {}

    if (paginate.sortBy && paginate.sortOrder) {
        sortCondition[paginate.sortBy] = paginate.sortOrder
    }

    const res = await AcademicSemester.find(finalConditions)
        .sort(sortCondition)
        .skip(paginate.skip)
        .limit(paginate.limit)
    const total = await AcademicSemester.countDocuments()
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    }
}

const singleSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const response = await AcademicSemester.findById(id).select({ _id: 0 })
    return response
}

const updateSemester = async (id: string, payload: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {

    const isExist = await AcademicSemester.findById(id)
    if (!isExist) {
        throw new ApiError(400, 'This Semester not exist');
    }

    if (payload.title != undefined && payload.code != undefined && academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(
            status.CONFLICT,
            'Semester code not match the semester year',
        )
    }

    const response = await AcademicSemester.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return response
}

const deleteSemester = async (id: string) => {

    const isExist = await AcademicSemester.findById(id)
    if (!isExist) {
        throw new ApiError(400, 'This Semester not exist');
    }

    const response = await AcademicSemester.findByIdAndDelete(id)

    return response


}
export const academicSemesterService = {
    createAcademicSemester,
    allSemester,
    singleSemester,
    updateSemester,
    deleteSemester
}
