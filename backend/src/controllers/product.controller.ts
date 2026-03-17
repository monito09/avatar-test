import { Request, Response } from 'express';
import * as productService from '../services/product.service.js';

export const listProducts = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string || '';
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = parseInt(req.query.skip as string) || 0;

        const data = await productService.getProducts(q, limit, skip);

        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};