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
exports.authService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const model_1 = require("../users/model");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const user = new model_1.User();
    const isExist = yield user.isUserExist(id);
    if (!isExist) {
        throw new ApiError_1.default(400, 'This user does not exist');
    }
    //match password
    const isValidPassword = yield user.isPasswordMatched(password, isExist.password);
    if (!isValidPassword) {
        throw new ApiError_1.default(400, 'Password not match');
    }
    //create access token, refresh token 
    const data = { id: id, role: isExist.role };
    const accessToken = yield (0, jwtHelper_1.createAccessToken)(data);
    const refreshToken = yield (0, jwtHelper_1.createRefreshToken)(data);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, jwtHelper_1.tokenVerify)(refreshToken, config_1.default.jwt.refresh_token);
        const { id, role } = decoded.data;
        const user = new model_1.User();
        const isExist = yield user.isUserExist(id);
        if (!isExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not found');
        }
        const data = { id, role };
        const newAccessToken = yield (0, jwtHelper_1.createAccessToken)(data);
        return {
            accessToken: newAccessToken
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
});
const changePassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.new_password != data.confirm_password) {
        throw new ApiError_1.default(400, 'New password and Confirm password are not same');
    }
    const isExist = yield model_1.User.findOne({ id: data.id });
    if (!isExist) {
        throw new ApiError_1.default(400, 'This user not exist!');
    }
    const isValidUser = yield bcrypt_1.default.compare(data.old_password, isExist.password);
    if (!isValidUser) {
        throw new ApiError_1.default(400, 'Current password not match');
    }
    const salt = bcrypt_1.default.genSaltSync(Number(config_1.default.salt_round));
    const EncrytedPassword = yield bcrypt_1.default.hash(data.new_password, salt);
    const update = { password: EncrytedPassword, updatedAt: new Date() };
    const response = yield model_1.User.findOneAndUpdate({ id: data.id }, update, { new: true, upsert: true, runValidators: true });
    return response;
});
exports.authService = {
    userLogin,
    refreshToken,
    changePassword
};
