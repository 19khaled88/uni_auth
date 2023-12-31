import { Model, Schema, Types } from "mongoose"
import { IStudent } from "../student/interface"
import { IAdmin } from "../admin/interface"
import { IFaculty } from "../faculty/interface"

//interface >> schema >> model
export type IUser = {
  id: string
  role: string
  password: string 
  student:Types.ObjectId | IStudent
  // student:Schema.Types.ObjectId | IStudent
  faculty:Types.ObjectId | IFaculty
  admin:Types.ObjectId | IAdmin
}

export type IUserMothods ={
  isUserExist(id:string):Promise<Partial<IUser> | null>;
  isPasswordMatched(
    plainPassword:string,
    databasePassword:string
  ):Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>,IUserMothods>
