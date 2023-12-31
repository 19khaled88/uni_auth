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
exports.adminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const model_1 = require("../users/model");
const contants_1 = require("./contants");
const model_2 = require("./model");
const getAllAdmins = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: contants_1.adminSearchableFields.map((item, index) => ({
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
    const total = yield model_2.Admin.countDocuments();
    const response = yield model_2.Admin.find(finalConditions)
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
const singleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield model_2.Admin.findById(id).select({ _id: 0 });
    return response;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield model_2.Admin.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This admin does not exist');
    }
    let deleteSuccess = false;
    // transaction & rollback
    const session = yield mongoose_1.default.startSession();
    //  session.startTransaction()
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield model_2.Admin.findByIdAndDelete([{ _id: id }], { session });
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
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let isExist = yield model_2.Admin.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This id not found');
    }
    const { name } = payload, others = __rest(payload, ["name"]);
    console.log(name, others);
    let updatingAdminData = Object.assign({}, others);
    // Update the name properties if they exist in the payload
    // if (name && Object.keys(name).length > 0) {
    //   updatingAdminData.name = { ...isExist.name, ...name };
    // }
    if (name && Object.keys(name).length > 0) {
        // Object.keys(name).forEach((key) => {
        //   updatingAdminData['name'][key] = name[key];
        // });
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatingAdminData[nameKey] = name[key];
        });
    }
    const updatedAdmin = yield model_2.Admin.findByIdAndUpdate(id, updatingAdminData, {
        new: true, // Return the updated document
        runValidators: true, // Run validators for updates
    });
    return updatedAdmin;
});
exports.adminService = {
    getAllAdmins,
    singleAdmin,
    deleteAdmin,
    updateAdmin
};
