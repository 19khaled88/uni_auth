import { z,object } from "zod"
import { bloodGroup, gender } from "./contants"


const createAdminZodSchema=z.object({
    body:z.object({
        password:z.string().optional(),

        admin:z.object({
            name:z.object({
                firstName:z.string({
                    required_error:'First name is required'
                }),
                middleName:z.string({
                    required_error:'Middle name is required'
                }),
                lastName:z.string({
                    required_error:'Last name is required'
                }),
            }),
            gender:z.enum([...gender] as [string, ...string[]],{
                required_error:'Gender is required'
            }),
            dateOfBirth:z.string({
                required_error:'date of birth is required'
            }),
            email:z.string({
                required_error:'email is required'
            }).email(),
            contactNo:z.string({
                required_error:'contactNo is required'
            }),
            emergencyContactNo:z.string({
                required_error:'emergencyContactNo is required'
            }),
            presentAddress:z.string({
                required_error:'presentAddress is required'
            }),
            permanentAddress:z.string({
                required_error:'permanentAddress is required'
            }),
            bloodGroup:z.enum([...bloodGroup]as [string, ...string[]],{
                required_error:'bloodGroup is required'
            }).optional(),
           
            profileImage:z.string({
                required_error:'profileImage is required'
            }).optional(),
            academicFaculty:z.string({
                required_error:'academicFaculty is required'
            }),
            academicDepartment:z.string({
                required_error:'academicDepartment is required'
            }),
            academicSemester:z.string({
                required_error:'academicSemester is required'
            }),
            
        })
    })
})

const updateAdminZodSchema=z.object({
    body:z.object({
        name:z.object({
            firstName:z.optional(z.string({required_error:'first name required'})),
            middleName:z.optional(z.string()),
            lastName:z.optional(z.string()),
        }).optional(),
        gender:z.optional(z.enum([...gender] as [string, ...string[]])),
        dateOfBirth:z.optional(z.string()),
        email:z.optional(z.string().email()),
        contactNo:z.string().optional(),
        emergencyContactNo:z.optional(z.string()),
        presentAddress:z.optional(z.string()),
        permanentAddress:z.optional(z.string()),
        bloodGroup:z.optional(z.enum([...bloodGroup]as [string, ...string[]])),
        profileImage:z.optional(z.string()),
        academicFaculty:z.optional(z.string()),
        academicDepartment:z.optional(z.string()),
        academicSemester:z.optional(z.string()),

    })
})

export const AdminZodValidation ={

    createAdminZodSchema,
    updateAdminZodSchema
}