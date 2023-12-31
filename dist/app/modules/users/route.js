"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validation_1 = require("./validation");
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enum/user");
const controller_2 = require("../student/controller");
const controller_3 = require("../admin/controller");
const validation_2 = require("../admin/validation");
const router = (0, express_1.default)();
router.post('/create-user', (0, validateRequest_1.default)(validation_1.UserZodValidation.createUserZodSchema), controller_1.userController.createUser);
router.post('/create-student', (0, validateRequest_1.default)(validation_1.UserZodValidation.createStudentZodSchema), (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_1.userController.createStudent);
router.post('/create-admin', (0, validateRequest_1.default)(validation_2.AdminZodValidation.createAdminZodSchema), (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_1.userController.createAdmin);
//student routes
router.get('/get-student/:id', controller_2.studentController.singleStudent);
router.delete('/delete-student/:id', (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_2.studentController.deleteStudent);
router.patch('/update-student/:id', (0, validateRequest_1.default)(validation_1.UserZodValidation.updateStudnetZodSchema), (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_2.studentController.updateStudent);
router.get('/get-students', (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_2.studentController.getAllStudents);
//admin routes
router.get('/get-admin/:id', (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN), controller_3.adminController.singleAdmin);
router.delete('/delete-admin/:id', (0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_3.adminController.deleteAdmin);
router.patch('/update-admin/:id', (0, validateRequest_1.default)(validation_2.AdminZodValidation.updateAdminZodSchema), (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_3.adminController.updateAdmin);
router.get('/get-admins', (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), controller_3.adminController.getAllAdmins);
router.post('/create-admin', () => { });
router.post('/create-faculty', () => { });
exports.default = router;
