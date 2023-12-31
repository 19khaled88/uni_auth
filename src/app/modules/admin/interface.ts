import { Schema, Model} from 'mongoose'
import { IBloodGroup, IGender } from './contants'
import { IAcademicFaculty } from '../academicFaculty/interface'
import { IAcademicSemester } from '../academicSemester/interface'
import { IAcademicDepartment } from '../academicDepartment/interface'
// import { studentSchema } from './model'
// export type IAdmin ={
//     id:string
// }

// export type IAdmin = InferSchemaType<typeof studentSchema>

// export type StudentModel = Model<IAdmin, Record<string, unknown>>
export type AdminModel = Model<IAdmin, Record<string, unknown>>
export type IAdmin = {
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