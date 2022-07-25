import express from 'express';
import {getAllProducts, addProducts, getProductsByCategory} from '../controllers/Products.js';

const router = express.Router();

router.post('/addProduct', addProducts)
router.get('/getAllProducts', getAllProducts);
router.get('/getProductByCategory/:id', getProductsByCategory)

export default router