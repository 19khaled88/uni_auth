import { Schema, model } from 'mongoose'
import { bloodGroup, gender } from './contants'
import { FacultyModel, IFaculty } from './interface'

export const facultySchema = new Schema<IFaculty>({
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
    unique:false
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

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
