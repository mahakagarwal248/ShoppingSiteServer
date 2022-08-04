import express from 'express';
import multer from 'multer';
import { addToWishlist, deleteProductFromWishlist, getWishlistProduct } from '../controllers/Wishlist.js';
const storage = multer.memoryStorage()
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

router.post('/addToWishlist/:id',upload.single('file'), addToWishlist);
router.get('/getWishlistProduct/:id', getWishlistProduct);
router.patch('/deleteFromWishlist/:id', deleteProductFromWishlist)

export default router;