import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicSemesterController } from './controller'
import { AcademicSemesterZodValidation } from './validation'

const router = express()

router.get('/single-semester/:id', academicSemesterController.singleSemester)
router.put(
  '/update-semester/:id',
  validateRequest(AcademicSemesterZodValidation.updateSemesterZodSchema),
  academicSemesterController.updateSemester,
)
router.delete('/delete-semester/:id', academicSemesterController.deleteSemester)
router.post(
  '/create-ac-semester',
  validateRequest(AcademicSemesterZodValidation.createSemesterZodSchema),
  academicSemesterController.createAcademicSememster,
)

router.get('/all-semester', academicSemesterController.allSemester)

export default router
