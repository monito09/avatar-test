import { Router } from 'express';
import { getCart, addItem, removeItem } from '../controllers/cart.controller.js';

const router = Router();

// Endpoints del Carrito
router.get('/', getCart);
router.post('/add', addItem);
router.delete('/remove/:idDetalle', removeItem);

export default router;