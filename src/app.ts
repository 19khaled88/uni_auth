import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import GlobalErrorHandler from './app/middleware/globalErrorHandler'
import userRouter from './app/modules/users/route'
import academicSemesterRouter from './app/modules/academicSemester/route'
import academicFacultyRoute from './app/modules/academicFaculty/route'
import academicDepartmentRoute from './app/modules/academicDepartment/route'
import authRoute from './app/modules/auth/route'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api/v1/user',userRouter)
app.use('/api/v1/academicSemester',academicSemesterRouter)
app.use('/api/v1/academicFaculty',academicFacultyRoute)
app.use('/api/v1/academicDepartment',academicDepartmentRoute)
app.use('/api/v1/auth',authRoute)


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'auth service for university management' })
})

//global error handler
app.use(GlobalErrorHandler)


//handle not found
app.use((req:Request,res:Response,next:NextFunction)=>{
  res.status(httpStatus.NOT_FOUND).json({
    success:false,
    message:'Not found',
    errorMessage:[{
      path:req.originalUrl,
      message:'This Page not found'
    }]
  })
  next()
})
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
export default app
