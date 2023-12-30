

import express from 'express'
import { userController } from './controller'
import validateRequest from '../../middleware/validateRequest'
import { UserZodValidation } from './validation'

const router = express()


router.post('/create-user', validateRequest(UserZodValidation.createUserZodSchema),userController.createUser)
router.post('/create-student',validateRequest(UserZodValidation.createStudentZodSchema),userController.createStudent)
router.get('/get-student/:id',userController.singleStudent)
router.delete('/delete-student/:id',userController.deleteStudent)
router.patch('/update-student/:id',userController.updateStudent)
router.get('/get-students',userController.getAllStudents)
router.post('/create-admin',()=>{})
router.post('/create-faculty',()=>{})


export default router