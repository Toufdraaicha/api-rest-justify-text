import { Request, Response } from 'express';
import { generateToken ,validateToken} from '../utils/token';
import { tokenQueries } from '../queries/tokenQueries';

export const getToken = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        // Obtenez la date d'aujourd'hui
        const today = new Date().toISOString().split('T')[0];

        // Récupérez le token correspondant à l'email pour la date d'aujourd'hui
        const existingToken = await tokenQueries.getTokenByEmailAndDate(email, today);
    
        
        if (existingToken  && validateToken(existingToken.token )) {
          // Si un token existe déjà pour cet email, renvoyez-le en réponse
          return res.json({ token: existingToken.token });
        }
    
        // Générez un nouveau token et stockez-le dans la base de données
        const token = generateToken(email);
        await tokenQueries.insertToken(email, token, today);

        return res.json({ token });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).send(errorMessage);
    }
};