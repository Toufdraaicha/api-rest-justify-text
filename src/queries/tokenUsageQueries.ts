// Importez le module de base de données et définissez les types nécessaires
import db  from '../config/db';

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

// Implémentation des méthodes de requête de token
export const tokenUsageQueries: TokenUsageQueries = {
    // Insérer un nouveau token avec sa date d'expiration
    async insertTokenUsage(token: string, date: string, wordCount: number): Promise<void> {
        try {
            await db.query('INSERT INTO token_usage (token, date, word_count) VALUES (?, ?, ?)', [token, date, wordCount]);
        } catch (error) {
            console.error('Error inserting token usage:', error);
            throw new Error('An error occurred while inserting token usage');
        }
    },

    async getTokenUsage(token: string,date:string): Promise<TokenUsage|null> {
        try {
            return new Promise((resolve, reject) => {
                db.query('SELECT word_count FROM token_usage WHERE token = ? AND date = ?', [token, date],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                            return;
                        }
    
                        if (rows.length === 0) {
                            resolve(null); // Aucun enregistrement trouvé, résoudre avec null
                            return;
                        }
    
                        resolve(rows[0]); // Renvoie le premier enregistrement de la liste
                    }
                );
            });
        } catch (error) {
            console.error('Error getting token usage:', error);
            throw new Error('An error occurred while getting token usage');
        }
    },

    // Mettre à jour les informations d'usage d'un token pour une date donnée
    async updateTokenUsage(token: string, date: string, wordCount: number): Promise<void> {
        try {
            await db.query('UPDATE token_usage SET word_count = ? WHERE token = ? AND date = ?', [wordCount, token, date]);
        } catch (error) {
            console.error('Error updating token usage:', error);
            throw new Error('An error occurred while updating token usage');
        }
    }
};