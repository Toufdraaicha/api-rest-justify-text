import express from 'express';
import { getToken } from '../controllers/authentification';

const router = express.Router();

router.post('/token', getToken);

export default router;