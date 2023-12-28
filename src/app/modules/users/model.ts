import { Model, Schema, model, Types } from 'mongoose'
import { IUser } from './interfaces'

type UserModel = Model<IUser, Record<string, unknown>>

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student:{
      type:Types.ObjectId,
      ref:'Student',
    },
    faculty:{
      type:Schema.Types.ObjectId,
      ref:'Faculty',
    },
    admin:{
      type:Schema.Types.ObjectId,
      ref:'Admin',
    }
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser, UserModel>('User', userSchema)
