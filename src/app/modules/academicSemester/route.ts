import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicSemesterController } from './controller'
import { AcademicSemesterZodValidation } from './validation'

const router = express()


router.post(
    '/create-ac-semester',
    validateRequest(AcademicSemesterZodValidation.createSemesterZodSchema), 
    academicSemesterController.createAcademicSememster)

export default router