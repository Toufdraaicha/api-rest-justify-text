"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const tokenUsageQueries_1 = require("../queries/tokenUsageQueries");
const token_1 = require("../utils/token");
const rateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Parse the text from the request body and count the number of words
        const wordCount = req.body.split(/\s+/).length; // Déclarez le type number pour wordCount
        // Retrieve the token from the request headers
        const token = req.headers.authorization; // Déclarez le type string ou undefined pour token
        if (!token) { // Vérifiez si le token existe
            return res.status(401).send('Unauthorized');
        }
        // Verify and decode the token
        if (!(0, token_1.validateToken)(token)) {
            return res.status(401).send('Invalid token');
        }
        // Check the database for token usage for the current date
        const today = new Date().toISOString().split('T')[0];
        const tokenUsage = yield tokenUsageQueries_1.tokenUsageQueries.getTokenUsage(token, today); // Déclarez le type de retour de getTokenUsage
        let currentWordCount = wordCount;
        if (tokenUsage) {
            currentWordCount += tokenUsage.word_count;
        }
        const limit = ((_a = process.env.LIMIT_WORD) !== null && _a !== void 0 ? _a : '80000');
        if (tokenUsage) {
            currentWordCount += tokenUsage.word_count;
        }
        // Check if word count exceeds 80,000
        if (currentWordCount > parseInt(limit)) {
            return res.status(402).send('Payment Required');
        }
        // Update or insert token usage
        if (tokenUsage) {
            yield tokenUsageQueries_1.tokenUsageQueries.updateTokenUsage(token, today, currentWordCount);
        }
        else {
            yield tokenUsageQueries_1.tokenUsageQueries.insertTokenUsage(token, today, currentWordCount);
        }
        next();
    }
    catch (error) {
        console.error('Error in rate limiter middleware:', error);
        return res.status(500).send('Internal Server Error');
    }
});
exports.rateLimiter = rateLimiter;
