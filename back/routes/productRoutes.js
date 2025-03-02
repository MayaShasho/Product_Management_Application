import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import validateProduct from '../middlewares/validateProduct.js';
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.post('/', authenticateToken, validateProduct, createProduct);
router.put('/:id', authenticateToken, validateProduct, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);
router.get('/search', authenticateToken, searchProducts);

export default router;
