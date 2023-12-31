import { NextFunction, Request, Response } from 'express'
import { userService } from './service'
import { Student } from '../student/model'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../shared/constants'
import { filterFields } from '../student/contants'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.createUser(req.body)
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      result: response,
    })
  } catch (error: any) {
    next(error)
  }
}

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student, ...userData } = req.body
    const response = await userService.createStudent(student, userData)
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      result: response,
    })
  } catch (error: any) {
    next(error)
  }
}

const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { admin, ...userData } = req.body
    const response = await userService.createAdmin(admin, userData)
    res.status(200).json({
      success: true,
      message: 'Admin created successfully',
      result: response,
    })
  } catch (error: any) {
    next(error)
  }
}




export const userController = {
  createUser,
  createStudent,
  createAdmin,
  
}
