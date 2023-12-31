import { NextFunction, Request, Response } from 'express'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../shared/constants'
import { filterFields } from '../student/contants'
import { adminService } from './service'


const getAllAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const paginationRes = pick(req.query, paginationFields)
      const filter = pick(req.query, filterFields)
     
      const response = await adminService.getAllAdmins(paginationRes, filter)
  
      res.status(200).json({
        success: true,
        message: 'All students retrieved successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const singleAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await adminService.singleAdmin(req.params.id)
      res.status(200).json({
        success: true,
        message: 'Single student retrieved successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const deleteAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await adminService.deleteAdmin(req.params.id)
      
      res.status(200).json({
        success: true,
        message: 'Student deleted for given ID',
        result: response === true ? 'Delete successfull' : response,
      })
    } catch (error) {
      next(error)
    }
  }
  
  const updateAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await adminService.updateAdmin(req.params.id,req.body)
      res.status(200).json({
        success: true,
        message: 'Student updated for given ID successfully',
        result: response,
      })
    } catch (error) {
      next(error)
    }
  }

  export const adminController ={
    getAllAdmins,
    singleAdmin,
    deleteAdmin,
    updateAdmin
  }