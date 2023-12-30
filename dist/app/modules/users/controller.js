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
exports.userController = void 0;
const service_1 = require("./service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const constants_1 = require("../../../shared/constants");
const contants_1 = require("../student/contants");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.userService.createUser(req.body);
        res.status(200).json({
            success: true,
            message: 'Successfully created user',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const createStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { student } = _a, userData = __rest(_a, ["student"]);
        const response = yield service_1.userService.createStudent(student, userData);
        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, contants_1.filterFields);
        const response = yield service_1.userService.getAllStudents(paginationRes, filter);
        res.status(200).json({
            success: true,
            message: 'All students retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const singleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.userService.singleStudent(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Single student retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.userService.deleteStudent(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Student deleted for given ID',
            result: response === true ? 'Delete successfull' : response,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.userService.updateStudent(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Student updated for given ID successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createUser,
    createStudent,
    singleStudent,
    getAllStudents,
    deleteStudent,
    updateStudent
};
