"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const GlobalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'something wrong';
    let errorMessage = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.stack) ?
            [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message
                }
            ] : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message) ?
            [
                { path: '', message: err === null || err === void 0 ? void 0 : err.message }
            ] : [];
    }
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined
    });
    next();
};
exports.default = GlobalErrorHandler;
