import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { User } from '../users/model'
import { IChangePassword, ILogin, ILoginRespone } from './interfacce'
import { createAccessToken, createRefreshToken, tokenVerify } from '../../../helpers/jwtHelper'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { IUser } from '../users/interfaces'

const userLogin = async (payload: ILogin):Promise<ILoginRespone> => {

  const {id,password} = payload

  const user = new User()
  const isExist = await user.isUserExist(id)

  if (!isExist) {
    throw new ApiError(400, 'This user does not exist')
  }


  //match password
  const isValidPassword = await user.isPasswordMatched(password, isExist.password as string)


  if (!isValidPassword) {
    throw new ApiError(400, 'Password not match')
  } 
  
  //create access token, refresh token 
  const data ={ id:id,role:isExist.role as string }
  const accessToken = await createAccessToken(data)
  const refreshToken = await createRefreshToken(data)
 
  return {
    accessToken:accessToken,
    refreshToken:refreshToken
  }

}

const refreshToken=async(refreshToken:string)=>{
    try {
        const decoded =await tokenVerify(refreshToken,config.jwt.refresh_token as Secret) as JwtPayload
       
        const {id,role } = decoded.data

        const user = new User()
        const isExist =await user.isUserExist(id)
        if(!isExist){
            throw new ApiError(httpStatus.NOT_FOUND,'User does not found')
        }
        
        const data ={ id,role}
        const newAccessToken =await createAccessToken(data)
        
        return {
            accessToken:newAccessToken
        }

    } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN,'Invalid refresh token')
    }
}

const changePassword=async(data:IChangePassword):Promise<IUser>=>{

   if(data.new_password != data.confirm_password){
    throw new ApiError(400,'New password and Confirm password are not same')
   }

   const isExist = await User.findOne({id:data.id})
   if(!isExist){
    throw new ApiError(400, 'This user not exist!')
   }

   const isValidUser = await bcrypt.compare(data.old_password, isExist.password)
   if(!isValidUser){
    throw new ApiError(400,'Current password not match')
   }

   const salt = bcrypt.genSaltSync(Number(config.salt_round))
   const EncrytedPassword =await bcrypt.hash(data.new_password, salt)
   const update = {password:EncrytedPassword,updatedAt:new Date()}
   const response = await User.findOneAndUpdate({id:data.id},update,{new:true,upsert:true,runValidators:true})
   return response
}

export const authService = {
  userLogin,
  refreshToken,
  changePassword
}
