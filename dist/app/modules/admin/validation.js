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
        name: zod_1.z.object({
            firstName: zod_1.z.optional(zod_1.z.string({ required_error: 'first name required' })),
            middleName: zod_1.z.optional(zod_1.z.string()),
            lastName: zod_1.z.optional(zod_1.z.string()),
        }).optional(),
        gender: zod_1.z.optional(zod_1.z.enum([...contants_1.gender])),
        dateOfBirth: zod_1.z.optional(zod_1.z.string()),
        email: zod_1.z.optional(zod_1.z.string().email()),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.optional(zod_1.z.string()),
        presentAddress: zod_1.z.optional(zod_1.z.string()),
        permanentAddress: zod_1.z.optional(zod_1.z.string()),
        bloodGroup: zod_1.z.optional(zod_1.z.enum([...contants_1.bloodGroup])),
        profileImage: zod_1.z.optional(zod_1.z.string()),
        academicFaculty: zod_1.z.optional(zod_1.z.string()),
        academicDepartment: zod_1.z.optional(zod_1.z.string()),
        academicSemester: zod_1.z.optional(zod_1.z.string()),
    })
});
exports.AdminZodValidation = {
    createAdminZodSchema,
    updateAdminZodSchema
};
