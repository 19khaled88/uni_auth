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
exports.facultyService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const model_1 = require("../users/model");
const model_2 = require("./model");
const contants_1 = require("./contants");
const getAllFaculties = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: contants_1.facultySearchableFields.map((item, index) => ({
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
    const total = yield model_2.Faculty.countDocuments();
    const response = yield model_2.Faculty.find(finalConditions)
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
const singleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield model_2.Faculty.findById(id).select({ _id: 0 });
    return response;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield model_2.Faculty.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This Faculty does not exist');
    }
    let deleteSuccess = false;
    // transaction & rollback
    const session = yield mongoose_1.default.startSession();
    //  session.startTransaction()
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield model_2.Faculty.findByIdAndDelete([{ _id: id }], { session });
            yield model_1.User.findOneAndDelete({ id: res === null || res === void 0 ? void 0 : res.id }, { session });
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
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let isExist = yield model_2.Faculty.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This id not found');
    }
    const { name } = payload, faculty = __rest(payload, ["name"]);
    let updatingFacultyData = Object.assign({}, faculty);
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
            updatingFacultyData[nameKey] = name[key];
        });
    }
    const updatedFaculty = yield model_2.Faculty.findByIdAndUpdate(id, updatingFacultyData, {
        new: true, // Return the updated document
        runValidators: true, // Run validators for updates
    });
    return updatedFaculty;
});
exports.facultyService = {
    getAllFaculties,
    singleFaculty,
    deleteFaculty,
    updateFaculty
};
