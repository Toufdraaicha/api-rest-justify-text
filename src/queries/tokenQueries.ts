import db  from '../config/db';
import {Token}  from '../models/token';
import { RowDataPacket } from 'mysql2';
// Interface pour les méthodes de requête de token
export interface TokenQueries {
    insertToken(email: string, token: string, generatedAt: string): Promise<void>;
    getTokenByEmailAndDate(email: string, date: string): Promise<Token|null>;
    updateTokenByEmail(email: string, token: string, generatedAt: string): Promise<void>;
}


export const tokenQueries: TokenQueries = {
    // Méthode pour insérer un nouveau token dans la base de données
    async insertToken(email: string, token: string, generatedAt: string): Promise<void> {
        // Exécutez la requête SQL appropriée pour insérer le token dans la base de données
        try {
            // Insérez le token dans la base de données
            // Remplacez les parties entre crochets par les valeurs réelles de vos paramètres
            await db.execute('INSERT INTO tokens (email, token, generated_at) VALUES (?, ?, ?)', [email, token, generatedAt]);
        } catch (error) {
            // Gérez les erreurs d'insertion du token
            console.error('Error inserting token:', error);
            throw new Error('Failed to insert token');
        }
    },

    // Méthode pour récupérer un token pour un email donné à une date donnée
    async getTokenByEmailAndDate(email: string, date: string): Promise<Token | null> {
        // Execute the appropriate SQL query to retrieve the token
        try {
            const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM tokens WHERE email = ? AND DATE(generated_at) = ?', [email, date]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0] as Token;
        } catch (error) {
            console.error('Error getting token usage:', error);
            throw new Error('An error occurred while getting token usage');
        }
    },

    // Méthode pour mettre à jour un token pour un email donné
    async updateTokenByEmail(email: string, token: string, generatedAt: string): Promise<void> {
        // Exécutez la requête SQL appropriée pour mettre à jour le token
        try {
            await db.execute('UPDATE tokens SET token = ?, generated_at = ? WHERE email = ?', [token, generatedAt, email]);
        } catch (error) {
            // Gérez les erreurs de mise à jour du token
            console.error('Error updating token:', error);
            throw new Error('Failed to update token');
        }
    }
}
