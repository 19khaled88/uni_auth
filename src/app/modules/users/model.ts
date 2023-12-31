import { Schema, model, Types } from 'mongoose'
import { IUser, IUserMothods, UserModel } from './interfaces'
import bcrypt from 'bcrypt'
import config from '../../../config'


const userSchema = new Schema<IUser,Record<string,never>,IUserMothods>(
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
);

userSchema.methods.isUserExist = async function(id:string):Promise<Partial<IUser> | null>{
  const user = await User.findOne({id},{password:1,role:1,id:1,_id:0});
  return user;
}

userSchema.methods.isPasswordMatched = async function(plainPassword,databasePassword):Promise<boolean>{
   const isMatched = await bcrypt.compare(plainPassword,databasePassword)
   return isMatched
}


  userSchema.pre('save',async function (next){
    // hash password
  const salt = bcrypt.genSaltSync(Number(config.salt_round))
  this.password = await bcrypt.hash(this.password,salt)
  // userData.password = await bcrypt.hashSync(userData.password,Number(config.salt_round))

  next()
  })


export const User = model<IUser, UserModel>('User', userSchema)
