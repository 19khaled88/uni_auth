import { string, z } from "zod";
import { bloodGroup, gender } from "../student/contants";


const createUserZodSchema = z.object({
    body:z.object({
        role:z.string({
            required_error:'user role is required'
        }).optional(),
        password:z.string().optional()
    })
})

const createStudentZodSchema=z.object({
    body:z.object({
        password:z.string().optional(),

        student:z.object({
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
            guardian:z.object({
                fatherName:z.string({
                    required_error:'fatherName is required'
                }),
                fatherOccupation:z.string({
                    required_error:'fatherOccupation is required'
                }),
                fatherContactNo:z.string({
                    required_error:'fatherContactNo is required'
                }),
                motherName:z.string({
                    required_error:'motherName is required'
                }),
                motherOccupation:z.string({
                    required_error:'motherOccupation is required'
                }),
                motherContactNo:z.string({
                    required_error:'motherContactNo is required'
                }),
                address:z.string({
                    required_error:'address is required'
                })
            }),
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

export const UserZodValidation ={
    createUserZodSchema,
    createStudentZodSchema
}