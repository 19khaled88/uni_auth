import { NextFunction, Request, Response } from 'express'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../shared/constants'
import { filterFields } from '../student/contants'
import { facultyService } from './service'


  const getAllFaculties = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const paginationRes = pick(req.query, paginationFields)
      const filter = pick(req.query, filterFields)
     
      const response = await facultyService.getAllFaculties(paginationRes, filter)
  
      res.status(200).json({
        success: true,
        message: 'All faculties retrieved successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const singlefaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await facultyService.singleFaculty(req.params.id)
      res.status(200).json({
        success: true,
        message: 'Single faculty retrieved successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const deleteFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await facultyService.deleteFaculty(req.params.id)
      
      res.status(200).json({
        success: true,
        message: 'Faculty deleted for given ID',
        result: response === true ? 'Delete successfull' : response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const updateFaculty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await facultyService.updateFaculty(req.params.id,req.body)
      res.status(200).json({
        success: true,
        message: 'Faculty updated for given ID successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }

  export const facultyController ={
    getAllFaculties,
    singlefaculty,
    deleteFaculty,
    updateFaculty
  }