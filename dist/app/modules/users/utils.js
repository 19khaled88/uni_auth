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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_Super_Admin_Id = exports.generate_Admin_Id = exports.generate_Faculty_Id = exports.generate_Student_Id = exports.generateUserId = exports.findLastSuperAdminId = exports.findLastAdminId = exports.findLastFacultyId = exports.findLastStudentId = exports.findLastUser = void 0;
const model_1 = require("./model");
// export type IAcademicSemester ={
//     code:string,
//     year:number
// }
const findLastUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield model_1.User.findOne({}, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
});
exports.findLastUser = findLastUser;
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id;
});
exports.findLastStudentId = findLastStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id;
});
exports.findLastFacultyId = findLastFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id;
});
exports.findLastAdminId = findLastAdminId;
const findLastSuperAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield model_1.User.findOne({ role: 'super_admin' }, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id;
});
exports.findLastSuperAdminId = findLastSuperAdminId;
const generateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastUser)()) || (0).toString().padStart(5, '0');
    const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementId;
});
exports.generateUserId = generateUserId;
const generate_Student_Id = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0');
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year}-${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}-${incrementId}`;
    return incrementId;
});
exports.generate_Student_Id = generate_Student_Id;
const generate_Faculty_Id = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = ((yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0'));
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generate_Faculty_Id = generate_Faculty_Id;
const generate_Admin_Id = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = ((yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0'));
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generate_Admin_Id = generate_Admin_Id;
const generate_Super_Admin_Id = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = ((yield (0, exports.findLastSuperAdminId)()) || (0).toString().padStart(5, '0'));
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generate_Super_Admin_Id = generate_Super_Admin_Id;
