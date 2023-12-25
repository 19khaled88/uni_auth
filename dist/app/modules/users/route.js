"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validation_1 = require("./validation");
const router = (0, express_1.default)();
router.post('/create-user', (0, validateRequest_1.default)(validation_1.UserZodValidation.createUserZodSchema), controller_1.userController.createUser);
exports.default = router;
