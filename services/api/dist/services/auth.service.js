"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fallback_key';
const registerUser = async (data) => {
    const { name, email, phone, password, role } = data;
    const existingUser = await prisma_1.default.user.findFirst({
        where: {
            OR: [{ email }, { phone }],
        },
    });
    if (existingUser) {
        throw new Error('User with this email or phone already exists');
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            phone,
            password: hashedPassword,
            role: role || 'PATIENT', //default role
        },
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '7d',
    });
    return { user, token };
};
exports.registerUser = registerUser;
const loginUser = async (data) => {
    const { identifier, password } = data;
    const user = await prisma_1.default.user.findFirst({
        where: {
            OR: [{ email: identifier }, { phone: identifier }],
        },
    });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '7d',
    });
    return { user, token };
};
exports.loginUser = loginUser;
