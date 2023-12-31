"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    url: process.env.DB_URL,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    default_password: process.env.DEFAULT_STUDENT_PASS,
    default_student_password: process.env.DEFAULT_PASS,
    default_admin_password: process.env.DEFAULT_ADMIN_PASS,
    default_student_role: process.env.DEFAULT_STUDENT_ROLE,
    default_admin_role: process.env.DEFAULT_ADMIN_ROLE,
    default_faculty_role: process.env.DEFAULT_FACULTY_ROLE,
    default_super_admin_role: process.env.DEFAULT_SUPER_ADMIN_ROLE,
    salt_round: process.env.SALT_ROUND,
    jwt: {
        refresh_token: process.env.REFRESH_TOKEN,
        access_token: process.env.ACCESS_TOKEN,
        access_token_expires_id: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refresh_token_expires_id: process.env.REFRESH_TOKEN_EXPIRES_IN
    }
};
