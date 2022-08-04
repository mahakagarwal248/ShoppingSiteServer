import express from 'express';
import multer from 'multer';
import { addToCart, deleteProductFromCart, getCartProduct, updateQuantity } from '../controllers/Cart.js';
const storage = multer.memoryStorage()
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

router.post('/addToCart/:id',upload.single('file'),  addToCart);
router.get('/getCartProduct/:id', getCartProduct);
router.patch('/deleteProduct/:id' , deleteProductFromCart);
router.patch('/updateQuantity/:id', updateQuantity);

export default router;