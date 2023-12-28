"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const contants_1 = require("../student/contants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string({
            required_error: 'user role is required'
        }).optional(),
        password: zod_1.z.string().optional()
    })
});
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required'
                }),
                middleName: zod_1.z.string({
                    required_error: 'Middle name is required'
                }),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required'
                }),
            }),
            gender: zod_1.z.enum([...contants_1.gender], {
                required_error: 'Gender is required'
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'date of birth is required'
            }),
            email: zod_1.z.string({
                required_error: 'email is required'
            }).email(),
            contactNo: zod_1.z.string({
                required_error: 'contactNo is required'
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'emergencyContactNo is required'
            }),
            presentAddress: zod_1.z.string({
                required_error: 'presentAddress is required'
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'permanentAddress is required'
            }),
            bloodGroup: zod_1.z.enum([...contants_1.bloodGroup], {
                required_error: 'bloodGroup is required'
            }).optional(),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'fatherName is required'
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'fatherOccupation is required'
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'fatherContactNo is required'
                }),
                motherName: zod_1.z.string({
                    required_error: 'motherName is required'
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'motherOccupation is required'
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'motherContactNo is required'
                }),
                address: zod_1.z.string({
                    required_error: 'address is required'
                })
            }),
            profileImage: zod_1.z.string({
                required_error: 'profileImage is required'
            }).optional(),
            academicFaculty: zod_1.z.string({
                required_error: 'academicFaculty is required'
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'academicDepartment is required'
            }),
            academicSemester: zod_1.z.string({
                required_error: 'academicSemester is required'
            }),
        })
    })
});
exports.UserZodValidation = {
    createUserZodSchema,
    createStudentZodSchema
};
