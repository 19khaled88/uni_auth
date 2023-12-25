import { z } from "zod";


const createUserZodSchema = z.object({
    body:z.object({
        role:z.string({
            required_error:'user role is required'
        }),
        password:z.string().optional()
    })
})

export const UserZodValidation ={
    createUserZodSchema
}