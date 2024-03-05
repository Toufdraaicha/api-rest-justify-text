"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor(id, email, token, generatedAt) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.generatedAt = generatedAt;
    }
}
exports.Token = Token;
