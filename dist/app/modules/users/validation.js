"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string({
            required_error: 'user role is required'
        }),
        password: zod_1.z.string().optional()
    })
});
exports.UserZodValidation = {
    createUserZodSchema
};
