import { NextFunction, Request, Response } from "express";
import { authService } from "./service";
import httpStatus from "http-status";
import config from "../../../config";


const userLogin=async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const response = await authService.userLogin(req.body)
        const {refreshToken, ...others} = response
    
        const cookieOptions ={
            secure: config.env === 'production',
            httpOnly:true
        }
    
        res.cookie('refreshToken',refreshToken,cookieOptions)
        res.status(httpStatus.OK).json({
            success:true,
            message:'Login successful',
            result:others
        })
    } catch (error) {
        next(error)
    }
   
}

const refreshToken=async(req:Request,res:Response,next:NextFunction)=>{
    const {refreshToken} = req.cookies

    const response = await authService.refreshToken(refreshToken)
    const cookieOptions ={
        secure: config.env === 'production',
        httpOnly:true
    }

    res.cookie('refreshToken',refreshToken,cookieOptions)

    res.status(httpStatus.OK).json({
        success:true,
        message:'Login successful',
        result:response
    })

}

const changePassword=async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const response = await authService.changePassword(req.body)
        res.status(200).json({
            success:true,
            message:'Password has been changed successfully',
            result:response
        })
    } catch (error) {
        next(error)
    }
  }

export const authController ={
    userLogin,
    refreshToken,
    changePassword
}