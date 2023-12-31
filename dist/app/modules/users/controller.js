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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const service_1 = require("./service");
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
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _b = req.body, { admin } = _b, userData = __rest(_b, ["admin"]);
        const response = yield service_1.userService.createAdmin(admin, userData);
        res.status(200).json({
            success: true,
            message: 'Admin created successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const createFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _c = req.body, { faculty } = _c, userData = __rest(_c, ["faculty"]);
        const response = yield service_1.userService.createFaculty(faculty, userData);
        res.status(200).json({
            success: true,
            message: 'Faculty created successfully',
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
    createAdmin,
    createFaculty
};
