import express from 'express'
import { authController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { UserZodValidation } from './validation';
const router = express()


router.post('/login',validateRequest(UserZodValidation.userLoginZodSchema),authController.userLogin);
router.post('/refresh-token',validateRequest(UserZodValidation.refreshTokenZodSchema),authController.refreshToken)

export default router