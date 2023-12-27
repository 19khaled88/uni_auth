import { NextFunction, Request, Response } from 'express'
import { paginationFields } from '../../../shared/constants'
import pick from '../../../shared/pick'
import { academicSemesterService } from './service'
import status from 'http-status'
import { filterFields } from './constants'

const createAcademicSememster = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.createAcademicSemester(
            req.body,
        )
        res.status(200).json({
            success: true,
            message: 'Successfully created Academic semester',
            result: response,
        })
        // next()
    } catch (error: any) {
        // res.status(200).json({
        //     success: false,
        //     message: 'Academic semester not created',
        //     result: error,
        // })
        next(error)
    }
}

const allSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const paginationOptions = {
        //     page: Number(req.query.page),
        //     limit: Number(req.query.limit),
        //     sortBy: req.query.sortBy?.toString(),
        //     sortOrder: req.query.sortOrder?.toString(),
        // }

        // const paginationRes = await pagenationElement(req)

        const paginationRes = pick(req.query, paginationFields)
        const filter = pick(req.query, filterFields)

        const response = await academicSemesterService.allSemester(
            paginationRes,
            filter,
        )
        res.status(200).json({
            success: true,
            message: 'Successfully Retrieve Academic semesters',
            meta: response?.meta,
            result: response?.data,
        })
        // next()
    } catch (error: any) {
        next(error)
    }
}

const singleSemester = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.singleSemester(req.params.id)
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single semester retrieved',
                data: response,
            })
        }
        res.status(status.NOT_FOUND).json({
            success: false,
            message: 'Data not found',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const updateSemester = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.updateSemester(
            req.params.id,
            req.body,
        )
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Semester updated successfully for given ID',
                data: response,
            })
        }
        res.status(status.NOT_FOUND).json({
            success: false,
            message: 'Semester not updated!!',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}

const deleteSemester = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await academicSemesterService.deleteSemester(req.params.id)
        
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Semester deleted successfully for given ID',
                data: response,
            })
        } else {
            res.status(status.NOT_FOUND).json({
                success: false,
                message: 'Semester not deleted',
                data: null,
            })
        }
        
    } catch (error) {
        next(error)
    }
}


export const academicSemesterController = {
    createAcademicSememster,
    allSemester,
    singleSemester,
    updateSemester,
    deleteSemester,
}
