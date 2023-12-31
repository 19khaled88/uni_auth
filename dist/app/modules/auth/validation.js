"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const userLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'user id is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'refresh token is required',
        }),
    }),
});
const passwordChangeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'user id is required' }),
        old_password: zod_1.z.string({ required_error: 'old password is required' }),
        new_password: zod_1.z.string({ required_error: 'new password is required' }),
        confirm_password: zod_1.z.string({
            required_error: 'confirm password is required',
        }),
    }),
});
exports.UserZodValidation = {
    userLoginZodSchema,
    refreshTokenZodSchema,
    passwordChangeZodSchema,
};
