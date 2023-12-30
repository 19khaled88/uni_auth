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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const contants_1 = require("../student/contants");
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
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
            populate: [
                {
                    path: 'academicFaculty',
                },
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicSemester',
                },
            ],
        });
    }
    return newUserAllData;
});
const getAllStudents = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: contants_1.studentSearchableFields.map((item, index) => ({
                [item]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filters).length) {
        andCondition.push({
            $and: Object.entries(filters).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const finalConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const sortCondition = {};
    if (paginate.sortBy && paginate.sortOrder) {
        sortCondition[paginate.sortBy] = paginate.sortOrder;
    }
    const total = yield model_3.Student.countDocuments();
    const response = yield model_3.Student.find(finalConditions)
        .sort(sortCondition)
        .limit(paginate.limit)
        .skip(paginate.skip);
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: response,
    };
});
const singleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield model_3.Student.findById(id).select({ _id: 0 });
    return response;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield model_3.Student.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This student does not exist');
    }
    let deleteSuccess = false;
    // transaction & rollback
    const session = yield mongoose_1.default.startSession();
    //  session.startTransaction()
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield model_3.Student.findByIdAndDelete([{ _id: id }], { session });
            yield model_2.User.findOneAndDelete({ id: res === null || res === void 0 ? void 0 : res.id }, { session });
        }));
        deleteSuccess = true;
    }
    catch (error) {
        yield session.endSession();
        throw error;
    }
    finally {
        yield session.endSession();
    }
    return deleteSuccess;
});
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let isExist = yield model_3.Student.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This id not found');
    }
    const { name, guardian } = payload, student = __rest(payload, ["name", "guardian"]);
    let updatingStudentData = Object.assign({}, student);
    // Update the name properties if they exist in the payload
    // if (name && Object.keys(name).length > 0) {
    //   updatingStudentData.name = { ...isExist.name, ...name };
    // }
    if (name && Object.keys(name).length > 0) {
        // Object.keys(name).forEach((key) => {
        //   updatingStudentData['name'][key] = name[key];
        // });
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatingStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}`;
            updatingStudentData[guardianKey] =
                guardian[key];
        });
    }
    const updatedStudent = yield model_3.Student.findByIdAndUpdate(id, updatingStudentData, {
        new: true, // Return the updated document
        runValidators: true, // Run validators for updates
    });
    return updatedStudent;
});
exports.userService = {
    createUser,
    createStudent,
    singleStudent,
    getAllStudents,
    deleteStudent,
    updateStudent,
};
