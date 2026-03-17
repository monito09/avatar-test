import { Request, Response } from 'express';
import * as cartService from '../services/cart.service.js';

export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await cartService.getActiveCart();
        res.status(200).json(cart);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const addItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idProducto, precio, sku } = req.body;

        // Validación básica
        if (!idProducto || precio === undefined) {
            return res.status(400).json({ error: 'idProducto y precio son obligatorios' });
        }

        const cart = await cartService.addProductToCart(idProducto, precio, sku);
        res.status(201).json(cart);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const removeItem = async (req: Request, res: Response) => {
    try {
        const idDetalle = parseInt(req.params.idDetalle as string, 10);
        const cart = await cartService.removeProductFromCart(idDetalle);
        res.status(200).json(cart);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};