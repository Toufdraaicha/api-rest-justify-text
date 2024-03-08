// Importez le module de base de données et définissez les types nécessaires
import db  from '../config/db';
import { RowDataPacket } from 'mysql2';
// Interface pour le résultat de la requête SQL
interface TokenUsage {
    word_count: number;
}

// Interface pour les méthodes de requête de token
export interface TokenUsageQueries {
    insertTokenUsage(token: string, date: string, wordCount: number): Promise<void>;
    getTokenUsage(token: string, date: string): Promise<TokenUsage|null>;
    updateTokenUsage(token: string, date: string, wordCount: number): Promise<void>;
}

export const tokenUsageQueries: TokenUsageQueries = {
    // Insérer un nouveau token avec sa date d'expiration
    async insertTokenUsage(token: string, date: string, wordCount: number): Promise<void> {
        try {
            await db.execute('INSERT INTO token_usage (token, date, word_count) VALUES (?, ?, ?)', [token, date, wordCount]);
        } catch (error) {
            console.error('Error inserting token usage:', error);
            throw new Error('An error occurred while inserting token usage');
        }
    },

    async getTokenUsage(token: string, date: string): Promise<TokenUsage | null> {
        try {
            const [rows] = await db.execute<RowDataPacket[]>('SELECT word_count FROM token_usage WHERE token = ? AND date = ?', [token, date]);

            if (rows.length === 0) {
                return null; // No record found, resolve with null
            }

            // Check the retrieved data
            const firstRow = rows[0];
            if (!Number.isInteger(firstRow.word_count) || firstRow.word_count < 0) {
                throw new Error('Invalid data retrieved from database');
            }

            // Create a TokenUsage object from the retrieved data
            const tokenUsage: TokenUsage = {
                word_count: firstRow.word_count,
            };

            return tokenUsage;
        } catch (error) {
            console.error('Error getting token usage:', error);
            throw new Error('An error occurred while getting token usage');
        }
    },

    // Mettre à jour les informations d'usage d'un token pour une date donnée
    async updateTokenUsage(token: string, date: string, wordCount: number): Promise<void> {
        try {
            await db.execute('UPDATE token_usage SET word_count = ? WHERE token = ? AND date = ?', [wordCount, token, date]);
        } catch (error) {
            console.error('Error updating token usage:', error);
            throw new Error('An error occurred while updating token usage');
        }
    }
};
