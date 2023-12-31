"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const userLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'user id is required'
        }),
        password: zod_1.z.string({
            required_error: 'password is required'
        })
    })
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'refresh token is required'
        })
    })
});
exports.UserZodValidation = {
    userLoginZodSchema,
    refreshTokenZodSchema
};
