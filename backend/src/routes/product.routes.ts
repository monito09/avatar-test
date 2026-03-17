import { Router } from 'express';
import { listProducts } from '../controllers/product.controller.js';

const router = Router();

// GET /api/products
router.get('/', listProducts);

export default router;