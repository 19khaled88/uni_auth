import { Schema, model } from 'mongoose'
import { bloodGroup, gender } from './contants'
import { IStudent, StudentModel } from './interface'




export const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
  },
  gender: {
    type: String,
    required: true,
    enum: gender,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum:bloodGroup
  },
  guardian: {
    type: {
      fatherName: {
        type: String,
        required: true,
      },

      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  profileImage:{
    type:String,
    // required:true
  },
  academicFaculty:{
    type:Schema.Types.ObjectId,
    ref:'AcademicFaculty',
    required:true
  },
  academicDepartment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment',
    required:true
  },
  academicSemester:{
    type:Schema.Types.ObjectId,
    ref:'AcademicSemester',
    required:true
  },
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
})

export const Student = model<IStudent, StudentModel>('Student', studentSchema)
