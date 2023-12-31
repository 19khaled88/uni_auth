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
exports.authController = void 0;
const service_1 = require("./service");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.authService.userLogin(req.body);
        const { refreshToken } = response, others = __rest(response, ["refreshToken"]);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Login successful',
            result: others
        });
    }
    catch (error) {
        next(error);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const response = yield service_1.authService.refreshToken(refreshToken);
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Login successful',
        result: response
    });
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.authService.changePassword(req.body);
        res.status(200).json({
            success: true,
            message: 'Password has been changed successfully',
            result: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authController = {
    userLogin,
    refreshToken,
    changePassword
};
