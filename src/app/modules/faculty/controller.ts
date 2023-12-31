import { NextFunction, Request, Response } from 'express'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../shared/constants'
import { filterFields } from '../student/contants'
import { studentService } from './service'

const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const paginationRes = pick(req.query, paginationFields)
      const filter = pick(req.query, filterFields)
     
      const response = await studentService.getAllStudents(paginationRes, filter)
  
      res.status(200).json({
        success: true,
        message: 'All students retrieved successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const singleStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await studentService.singleStudent(req.params.id)
      res.status(200).json({
        success: true,
        message: 'Single student retrieved successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await studentService.deleteStudent(req.params.id)
      
      res.status(200).json({
        success: true,
        message: 'Student deleted for given ID',
        result: response === true ? 'Delete successfull' : response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await studentService.updateStudent(req.params.id,req.body)
      res.status(200).json({
        success: true,
        message: 'Student updated for given ID successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }

  export const studentController ={
    getAllStudents,
    singleStudent,
    deleteStudent,
    updateStudent
  }