import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester, month } from './interface'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
import { NextFunction } from 'express'


const academicSemesterSchema = new Schema<IAcademicSemester>(
    {

        title: {
            type: String,
            required: true,
            enum: ['Autumn', 'Summer', 'Fall']
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: ['01', '02', '03']
        },
        startMonth: {
            type: String,
            required: true,
            enum: month
        },
        endMonth: {
            type: String,
            required: true,
            enum: month
        }
    },
    {
        timestamps: true,
    },
)

academicSemesterSchema.pre('save', async function (next) {
    const isExist = await AcademicSemester.findOne({ title: this.title, year: this.year })
    if (isExist) {
        throw new ApiError(status.CONFLICT, 'same data already exist')
    }
    next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema)



