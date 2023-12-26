"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const route_1 = __importDefault(require("./app/modules/users/route"));
const route_2 = __importDefault(require("./app/modules/academicSemester/route"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use('/api/v1/user', route_1.default);
app.use('/api/v1/semester', route_2.default);
app.get('/', (req, res) => {
    res.json({ message: 'auth service for university management' });
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessage: [{
                path: req.originalUrl,
                message: 'This Page not found'
            }]
    });
    next();
});
exports.default = app;
