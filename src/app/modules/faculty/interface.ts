import { Schema, Model} from 'mongoose'
import { IBloodGroup, IGender } from './contants'
import { IAcademicFaculty } from '../academicFaculty/interface'
import { IAcademicSemester } from '../academicSemester/interface'
import { IAcademicDepartment } from '../academicDepartment/interface'
// import { studentSchema } from './model'
// export type IFaculty ={
//     id:string
// }

// export type IFaculty = InferSchemaType<typeof studentSchema>

// export type StudentModel = Model<IFaculty, Record<string, unknown>>
export type FacultyModel = Model<IFaculty, Record<string, unknown>>
export type IFaculty = {
    id: string
    name: {
        firstName:string
        middleName:string
        lastName:string
    }
    gender:IGender
    dateOfBirth:string 
    email:string 
    contactNo:string 
    emergencyContactNo:string 
    presentAddress:string
    permanentAddress:string
    bloodGroup?:IBloodGroup
    profileImage?:string 
    academicFaculty:Schema.Types.ObjectId | IAcademicFaculty
    academicSemester:Schema.Types.ObjectId | IAcademicSemester
    academicDepartment:Schema.Types.ObjectId | IAcademicDepartment
  }