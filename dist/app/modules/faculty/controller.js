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
exports.facultyController = void 0;
const pick_1 = __importDefault(require("../../../shared/pick"));
const constants_1 = require("../../../shared/constants");
const contants_1 = require("../student/contants");
const service_1 = require("./service");
const getAllFaculties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, contants_1.filterFields);
        const response = yield service_1.facultyService.getAllFaculties(paginationRes, filter);
        res.status(200).json({
            success: true,
            message: 'All faculties retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const singlefaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.facultyService.singleFaculty(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Single faculty retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.facultyService.deleteFaculty(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Faculty deleted for given ID',
            result: response === true ? 'Delete successfull' : response,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.facultyService.updateFaculty(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Faculty updated for given ID successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.facultyController = {
    getAllFaculties,
    singlefaculty,
    deleteFaculty,
    updateFaculty
};
