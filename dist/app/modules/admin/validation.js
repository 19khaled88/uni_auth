"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminZodValidation = void 0;
const zod_1 = require("zod");
const contants_1 = require("./contants");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
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
const updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string().optional(),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string().optional(),
            }).optional(),
            gender: zod_1.z.enum([...contants_1.gender]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            bloodGroup: zod_1.z.enum([...contants_1.bloodGroup]).optional(),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string().optional(),
                fatherOccupation: zod_1.z.string().optional(),
                fatherContactNo: zod_1.z.string().optional(),
                motherName: zod_1.z.string().optional(),
                motherOccupation: zod_1.z.string().optional(),
                motherContactNo: zod_1.z.string().optional(),
                address: zod_1.z.string().optional()
            }).optional(),
            profileImage: zod_1.z.string().optional(),
            academicFaculty: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
            academicSemester: zod_1.z.string().optional(),
        })
    })
});
exports.AdminZodValidation = {
    createAdminZodSchema,
    updateAdminZodSchema
};
