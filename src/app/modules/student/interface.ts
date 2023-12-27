import { Schema, Model} from 'mongoose'
import { IBloodGroup, IGender } from './contants'
// import { studentSchema } from './model'
// export type IStudent ={
//     id:string
// }

// export type IStudent = InferSchemaType<typeof studentSchema>

// export type StudentModel = Model<IStudent, Record<string, unknown>>
export type StudentModel = Model<IStudent, Record<string, unknown>>
export type IStudent = {
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
    bloodGroup:IBloodGroup
    guardian:{
        fatherName:string
        fatherOccupation:string
        fatherContactNo:string
        motherName:string
        motherOccupation:string
        motherContactNo:string
        address:string
    }
    profileImage:string 
    academicFaculty:Schema.Types.ObjectId
    academicSemester:Schema.Types.ObjectId
    academicDepartment:Schema.Types.ObjectId
  }