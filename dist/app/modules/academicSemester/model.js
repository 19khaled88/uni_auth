"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemesterSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        required: true,
    },
    endMonth: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
exports.AcademicSemester = (0, mongoose_1.model)('AcademicSemester', academicSemesterSchema);
