"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const route_1 = __importDefault(require("./app/modules/users/route"));
const route_2 = __importDefault(require("./app/modules/academicSemester/route"));
const route_3 = __importDefault(require("./app/modules/academicFaculty/route"));
const route_4 = __importDefault(require("./app/modules/academicDepartment/route"));
const route_5 = __importDefault(require("./app/modules/auth/route"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//routes
app.use('/api/v1/user', route_1.default);
app.use('/api/v1/academicSemester', route_2.default);
app.use('/api/v1/academicFaculty', route_3.default);
app.use('/api/v1/academicDepartment', route_4.default);
app.use('/api/v1/auth', route_5.default);
app.get('/', (req, res) => {
    res.json({ message: 'auth service for university management' });
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessage: [{
                path: req.originalUrl,
                message: 'This Page not found'
            }]
    });
    next();
});
// const academicSemester ={
//   code:"01",
//   year:2020
// }
// const studentId=async()=>{
//   const studentId =await generateStudentId(academicSemester)
//   console.log(studentId)
// }
// const facultyId=async()=>{
//   const facultyId = await generateFacultyId()
//   console.log(facultyId)
// }
// const adminId=async()=>{
//   const adminId = await generateAdminId()
//   console.log(adminId)
// }
// studentId()
// facultyId()
// adminId()
exports.default = app;
