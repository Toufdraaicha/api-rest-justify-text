import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (email: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
export const validateToken = (token: string): boolean => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        // Vérifiez si le token est valide en le vérifiant avec la clé secrète
        jwt.verify(token, process.env.JWT_SECRET);
        return true; // Le token est valide
    } catch (error) {
        return false; // Le token est invalide
    }
};