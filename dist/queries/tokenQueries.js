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
exports.tokenQueries = void 0;
const db_1 = __importDefault(require("../config/db"));
exports.tokenQueries = {
    // Méthode pour insérer un nouveau token dans la base de données
    insertToken(email, token, generatedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            // Exécutez la requête SQL appropriée pour insérer le token dans la base de données
            try {
                // Insérez le token dans la base de données
                // Remplacez les parties entre crochets par les valeurs réelles de vos paramètres
                yield db_1.default.query('INSERT INTO tokens (email, token, generated_at) VALUES (?, ?, ?)', [email, token, generatedAt]);
            }
            catch (error) {
                // Gérez les erreurs d'insertion du token
                console.error('Error inserting token:', error);
                throw new Error('Failed to insert token');
            }
        });
    },
    // Méthode pour récupérer un token pour un email donné à une date donnée
    getTokenByEmailAndDate(email, date) {
        return __awaiter(this, void 0, void 0, function* () {
            // Exécutez la requête SQL appropriée pour récupérer le token
            try {
                return new Promise((resolve, reject) => {
                    db_1.default.query('SELECT * FROM tokens WHERE email = ? AND DATE(generated_at) = ?', [email, date], (err, rows) => {
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
    // Méthode pour mettre à jour un token pour un email donné
    updateTokenByEmail(email, token, generatedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            // Exécutez la requête SQL appropriée pour mettre à jour le token
            try {
                yield db_1.default.query('UPDATE tokens SET token = ?, generated_at = ? WHERE email = ?', [token, generatedAt, email]);
            }
            catch (error) {
                // Gérez les erreurs de mise à jour du token
                console.error('Error updating token:', error);
                throw new Error('Failed to update token');
            }
        });
    }
};
