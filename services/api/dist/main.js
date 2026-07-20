"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});
app.listen(PORT, () => {
    console.log(`CareDrop API is running on http://localhost:${PORT}`);
});
