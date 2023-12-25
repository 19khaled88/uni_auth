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
exports.academicSemesterService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const constants_1 = require("./constants");
const model_1 = require("./model");
const http_status_1 = __importDefault(require("http-status"));
const createAcademicSemester = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (constants_1.academicSemesterTitleCodeMapper[data.title] !== data.code) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Semester code not match the semester year');
    }
    const res = yield model_1.AcademicSemester.create(data);
    if (!res) {
        throw new Error('Failed to create academic semester');
    }
    return res;
});
exports.academicSemesterService = {
    createAcademicSemester,
};
