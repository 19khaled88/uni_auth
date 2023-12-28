"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const model_1 = require("../academicSemester/model");
const model_2 = require("./model");
const utils_1 = require("./utils");
const model_3 = require("../student/model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, utils_1.generateUserId)();
    // if(user.role === 'student'){
    //     const id = await generate_Student_Id()
    //     user.id = id
    // }
    user.id = id;
    if (!user.password) {
        user.password = config_1.default.default_password;
    }
    if (!user.role) {
        user.role = config_1.default.default_role;
    }
    const res = yield model_2.User.create(user);
    if (!res) {
        throw new Error('Failed to create user');
    }
    return res;
});
// with transation and rollback way
const createStudent = (student, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData.password) {
        userData.password = config_1.default.default_password;
    }
    //user role set
    if (!userData.role) {
        userData.role = config_1.default.default_role;
    }
    //get academic semester info
    const academicSemesterInfo = yield model_1.AcademicSemester.findById(student.academicSemester);
    let newUserAllData = null;
    // transaction & rollback
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        //generate student id
        const id = yield (0, utils_1.generate_Student_Id)(academicSemesterInfo);
        userData.id = id;
        student.id = id;
        const newStudent = yield model_3.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        //set student's _id into user's student reference
        userData.student = newStudent[0]._id;
        const newUser = yield model_2.User.create([userData], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield model_2.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: ([
                {
                    path: 'academicFaculty'
                },
                {
                    path: 'academicDepartment'
                },
                {
                    path: 'academicSemester'
                },
            ])
        });
    }
    return newUserAllData;
});
exports.userService = {
    createUser,
    createStudent,
};
