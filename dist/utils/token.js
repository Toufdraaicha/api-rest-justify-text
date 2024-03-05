"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (email) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
const validateToken = (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        // Vérifiez si le token est valide en le vérifiant avec la clé secrète
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return true; // Le token est valide
    }
    catch (error) {
        return false; // Le token est invalide
    }
};
exports.validateToken = validateToken;
