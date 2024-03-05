// src/controllers/justificationController.ts
import { Request, Response } from 'express';
import { TextJustifier } from '../utils/textJustifier';

export const justify = (req: Request, res: Response) => {
    const justifiedText = TextJustifier.justify(req.body);
    res.send(justifiedText);
};