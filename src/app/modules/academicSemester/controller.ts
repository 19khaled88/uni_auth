import { NextFunction, Request, Response } from "express";
import { academicSemesterService } from "./service";

const createAcademicSememster = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await academicSemesterService.createAcademicSemester(req.body)
        res.status(200).json({
            success: true,
            message: 'Successfully created Academic',
            result: response
        })
    } catch (error: any) {
        next(error)
    }
}

export const academicSemesterController = {
    createAcademicSememster
}