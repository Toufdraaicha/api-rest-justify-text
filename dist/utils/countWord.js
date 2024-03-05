"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWords = void 0;
function countWords(text) {
    // Remove extra whitespaces and split the text into words
    const words = text.trim().split(/\s+/);
    // Count the number of words
    return words.length;
}
exports.countWords = countWords;
