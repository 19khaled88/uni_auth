import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './constants'
import { IAcademicSemester } from './interface'
import { AcademicSemester } from './model'
import status from 'http-status'

const createAcademicSemester = async (
    data: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
    if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
        throw new ApiError(status.CONFLICT, 'Semester code not match the semester year')
    }
    const res = await AcademicSemester.create(data)
    if (!res) {
        throw new Error('Failed to create academic semester')
    }
    return res
}

export const academicSemesterService = {
    createAcademicSemester,
}
