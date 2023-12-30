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

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const paginationRes = pick(req.query, paginationFields)
    const filter = pick(req.query, filterFields)

    const response = await userService.getAllStudents(paginationRes, filter)

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
    const response = await userService.singleStudent(req.params.id)
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
    const response = await userService.deleteStudent(req.params.id)
    
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
    const response = await userService.updateStudent(req.params.id,req.body)
    res.status(200).json({
      success: true,
      message: 'Student updated for given ID successfully',
      result: response,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  createStudent,
  singleStudent,
  getAllStudents,
  deleteStudent,
  updateStudent
}
