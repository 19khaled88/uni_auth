import { NextFunction, Request, Response, json } from "express";
import { userService } from "./service";


const createUser = async(req:Request,res:Response,next:NextFunction)=>{
    try { 
        const response = await userService.createUser(req.body)
        res.status(200).json({
            success:true,
            message:'Successfully created user',
            result:response
        })
    } catch (error:any) {
        console.log(error)
        next(error)
        // res.status(400).json({
        //     err:error
        // })
    }
}

export const userController = {
    createUser
}