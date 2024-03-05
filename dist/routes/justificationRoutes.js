"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/justificationRoutes.ts
const express_1 = __importDefault(require("express"));
const justification_1 = require("../controllers/justification");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = express_1.default.Router();
console.log('router');
router.post('/justify', rateLimiter_1.rateLimiter, justification_1.justify);
exports.default = router;
