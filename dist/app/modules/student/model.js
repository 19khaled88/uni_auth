"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = require("mongoose");
const contants_1 = require("./contants");
exports.studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
    },
    gender: {
        type: String,
        required: true,
        enum: contants_1.gender,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: contants_1.bloodGroup
    },
    guardian: {
        type: {
            fatherName: {
                type: String,
                required: true,
            },
            fatherOccupation: {
                type: String,
                required: true,
            },
            fatherContactNo: {
                type: String,
                required: true,
            },
            motherName: {
                type: String,
                required: true,
            },
            motherOccupation: {
                type: String,
                required: true,
            },
            motherContactNo: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    profileImage: {
        type: String,
        required: true
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Student = (0, mongoose_1.model)('Student', exports.studentSchema);
