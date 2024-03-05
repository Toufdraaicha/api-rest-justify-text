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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenUsageQueries = void 0;
// Importez le module de base de données et définissez les types nécessaires
const db_1 = __importDefault(require("../config/db"));
// Implémentation des méthodes de requête de token
exports.tokenUsageQueries = {
    // Insérer un nouveau token avec sa date d'expiration
    insertTokenUsage(token, date, wordCount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.query('INSERT INTO token_usage (token, date, word_count) VALUES (?, ?, ?)', [token, date, wordCount]);
            }
            catch (error) {
                console.error('Error inserting token usage:', error);
                throw new Error('An error occurred while inserting token usage');
            }
        });
    },
    getTokenUsage(token, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    db_1.default.query('SELECT word_count FROM token_usage WHERE token = ? AND date = ?', [token, date], (err, rows) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (rows.length === 0) {
                            resolve(null); // Aucun enregistrement trouvé, résoudre avec null
                            return;
                        }
                        resolve(rows[0]); // Renvoie le premier enregistrement de la liste
                    });
                });
            }
            catch (error) {
                console.error('Error getting token usage:', error);
                throw new Error('An error occurred while getting token usage');
            }
        });
    },
    // Mettre à jour les informations d'usage d'un token pour une date donnée
    updateTokenUsage(token, date, wordCount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.query('UPDATE token_usage SET word_count = ? WHERE token = ? AND date = ?', [wordCount, token, date]);
            }
            catch (error) {
                console.error('Error updating token usage:', error);
                throw new Error('An error occurred while updating token usage');
            }
        });
    }
};
