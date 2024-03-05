import { Request, Response, NextFunction } from 'express'; // Importez les types Request, Response et NextFunction depuis Express
import {tokenUsageQueries } from '../queries/tokenUsageQueries';
import {validateToken} from '../utils/token';
export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => { // Spécifiez les types des paramètres req, res et next
    try {
        // Parse the text from the request body and count the number of words
        const wordCount: number = req.body.split(/\s+/).length; // Déclarez le type number pour wordCount

        // Retrieve the token from the request headers
        const token: string | undefined = req.headers.authorization; // Déclarez le type string ou undefined pour token

        if (!token) { // Vérifiez si le token existe
            return res.status(401).send('Unauthorized');
        }
        // Verify and decode the token
        if(!validateToken(token)){
            return res.status(401).send('Invalid token');
        }
       
        // Check the database for token usage for the current date
        const today: string = new Date().toISOString().split('T')[0];
        const tokenUsage = await tokenUsageQueries.getTokenUsage(token, today); // Déclarez le type de retour de getTokenUsage

        let currentWordCount: number = wordCount;
        if (tokenUsage) {
            currentWordCount += tokenUsage.word_count;
        }
        const  limit=(process.env.LIMIT_WORD ?? '80000') ;
        if (tokenUsage) {
            currentWordCount += tokenUsage.word_count;
        }
        // Check if word count exceeds 80,000
        if (currentWordCount > parseInt(limit) ) {
            return res.status(402).send('Payment Required');
        }

        // Update or insert token usage
        if (tokenUsage) {
            await tokenUsageQueries.updateTokenUsage(token, today, currentWordCount);
        } else {
            await tokenUsageQueries.insertTokenUsage(token, today, currentWordCount);
        }

        next();
    } catch (error) {
        console.error('Error in rate limiter middleware:', error);
        return res.status(500).send('Internal Server Error');
    }
};
