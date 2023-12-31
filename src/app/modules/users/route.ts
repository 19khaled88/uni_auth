
import express from 'express'
import { userController } from './controller'
import validateRequest from '../../middleware/validateRequest'
import { UserZodValidation } from './validation'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'
import { studentController } from '../student/controller'
import { adminController } from '../admin/controller'
import { AdminZodValidation } from '../admin/validation'
import { authController } from '../auth/controller'

const router = express()


router.post('/create-user', validateRequest(UserZodValidation.createUserZodSchema),userController.createUser);
router.post('/create-student',validateRequest(UserZodValidation.createStudentZodSchema),auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),userController.createStudent);
router.post('/create-admin',validateRequest(AdminZodValidation.createAdminZodSchema),auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),userController.createAdmin)

//student routes
router.get('/get-student/:id',studentController.singleStudent);
router.delete('/delete-student/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),studentController.deleteStudent);
router.patch('/update-student/:id',validateRequest(UserZodValidation.updateStudnetZodSchema),auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),studentController.updateStudent);
router.get('/get-students',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),studentController.getAllStudents);

//admin routes
router.get('/get-admin/:id',auth(ENUM_USER_ROLE.ADMIN),adminController.singleAdmin);
router.delete('/delete-admin/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN),adminController.deleteAdmin)
router.patch('/update-admin/:id',validateRequest(AdminZodValidation.updateAdminZodSchema),auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),adminController.updateAdmin)
router.get('/get-admins',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),adminController.getAllAdmins)





router.post('/create-admin',()=>{});
router.post('/create-faculty',()=>{});


export default router