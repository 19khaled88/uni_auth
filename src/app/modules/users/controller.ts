import { NextFunction, Request, Response, json } from "express";
import { userService } from "./service";
import ApiError from "../../../errors/ApiError";


const createUser = async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body)
    try {
      
        const response = await userService.createUser(req.body)
        res.status(200).json({
            success:true,
            message:'Successfully created user',
            result:response
        })
    } catch (error:any) {
        next(error)
        // res.status(400).json({
        //     err:error
        // })
    }
}

export default {
    createUser
}