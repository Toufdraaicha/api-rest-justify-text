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
exports.getToken = void 0;
const token_1 = require("../utils/token");
const tokenQueries_1 = require("../queries/tokenQueries");
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    try {
        // Obtenez la date d'aujourd'hui
        const today = new Date().toISOString().split('T')[0];
        // Récupérez le token correspondant à l'email pour la date d'aujourd'hui
        const existingToken = tokenQueries_1.tokenQueries.getTokenByEmailAndDate(email, today);
        console.log(existingToken)
        if (existingToken && (0, token_1.validateToken)(existingToken.token)) {
            // Si un token existe déjà pour cet email, renvoyez-le en réponse
            return res.json({ token: existingToken.token });
        }
        // Générez un nouveau token et stockez-le dans la base de données
        const token = (0, token_1.generateToken)(email);
        yield tokenQueries_1.tokenQueries.insertToken(email, token, today);
        return res.json({ token });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).send(errorMessage);
    }
});
exports.getToken = getToken;
