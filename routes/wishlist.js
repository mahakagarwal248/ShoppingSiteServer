import express from 'express';

import { addToWishlist, deleteProductFromWishlist, getWishlistProduct } from '../controllers/Wishlist.js';

const router = express.Router();

router.post('/addToWishlist/:id', addToWishlist);
router.get('/getWishlistProduct/:id', getWishlistProduct);
router.patch('/deleteFromWishlist/:id', deleteProductFromWishlist)

export default router;