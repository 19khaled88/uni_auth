import express from 'express'
import { authController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { UserZodValidation } from './validation';
const router = express()


//authenticate route
router.post('/login',validateRequest(UserZodValidation.userLoginZodSchema),authController.userLogin);
router.post('/refresh-token',validateRequest(UserZodValidation.refreshTokenZodSchema),authController.refreshToken)

//change password 
router.post('/change-password',validateRequest(UserZodValidation.passwordChangeZodSchema),authController.changePassword)


export default router