

import express from 'express'
import { userController } from './controller'
import validateRequest from '../../middleware/validateRequest'
import { UserZodValidation } from './validation'

const router = express()


router.post('/create-user', validateRequest(UserZodValidation.createUserZodSchema),userController.createUser)
router.post('/create-student',validateRequest(UserZodValidation.createStudentZodSchema),userController.createStudent)

export default router