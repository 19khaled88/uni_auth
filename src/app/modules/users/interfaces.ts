import { Schema } from "mongoose"
import { IStudent } from "../student/interface"

//interface >> schema >> model
export type IUser = {
  id: string
  role: string
  password: string 
  student:Schema.Types.ObjectId | IStudent
  faculty:Schema.Types.ObjectId
  admin:Schema.Types.ObjectId
}
