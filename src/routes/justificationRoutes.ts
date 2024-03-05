// src/routes/justificationRoutes.ts
import express from 'express';
import { justify } from '../controllers/justification';
import { rateLimiter } from '../middleware/rateLimiter';

const router = express.Router();
console.log('router')
router.post('/justify', rateLimiter, justify);

export default router;