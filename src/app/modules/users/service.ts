import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/model'
import { IStudent } from '../student/interface'
import { IUser } from './interfaces'
import { User } from './model'
import { generateUserId, generate_Student_Id } from './utils'
import { Student } from '../student/model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  // if(user.role === 'student'){
  //     const id = await generate_Student_Id()
  //     user.id = id
  // }
  user.id = id
  if (!user.password) {
    user.password = config.default_password as string
  }

  if(!user.role){
    user.role = config.default_role as string
  }

  const res = await User.create(user)
  if (!res) {
    throw new Error('Failed to create user')
  }
  return res
}


// with transation and rollback way
const createStudent = async (student: IStudent, userData: IUser) => {
  if (!userData.password) {
    userData.password = config.default_password as string
  }

 //user role set
 if(!userData.role){
    userData.role = config.default_role as string
 }


  //get academic semester info
  const academicSemesterInfo = await AcademicSemester.findById(
    student.academicSemester,
  );

  let newUserAllData = null;

  // transaction & rollback
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    

    //generate student id
    const id = await generate_Student_Id(academicSemesterInfo);
    userData.id = id 
    student.id = id 

   
    const newStudent = await Student.create([student],{session});

    if(!newStudent.length){
        throw new ApiError(httpStatus.BAD_REQUEST,'Failed to create student');
    }

    //set student's _id into user's student reference
    userData.student = newStudent[0]._id;
    
    const newUser = await User.create([userData],{session});

    if(!newUser.length){
        throw new ApiError(httpStatus.BAD_REQUEST,'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error
  }

  if(newUserAllData){
    newUserAllData = await User.findOne({id:newUserAllData.id}).populate({
        path:'student',
        populate:([
            {
                path:'academicFaculty'
            },
            {
                path:'academicDepartment'
            },
            {
                path:'academicSemester'
            },
        ])
    })
  }

  return newUserAllData;
}
export const userService = {
  createUser,
  createStudent,
}
