import express from 'express';

import { addToCart, deleteProductFromCart, getCartProduct, updateQuantity } from '../controllers/Cart.js';

const router = express.Router();

router.post('/addToCart/:id', addToCart);
router.get('/getCartProduct/:id', getCartProduct);
router.patch('/deleteProduct/:id' , deleteProductFromCart);
router.patch('/updateQuantity/:id', updateQuantity);

export default router;