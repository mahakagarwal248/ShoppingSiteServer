import express from 'express';
import multer from 'multer';
import Validation from '../helpers/Validation.js';
import paramValidations from '../config/param-validations.js';
import { addToCart, deleteProductFromCart, getCartProduct, updateQuantity } from '../controllers/Cart.js';
const storage = multer.memoryStorage()
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

router.post('/addToCart/:id',upload.single('file'),Validation(paramValidations.addToCart), addToCart);
router.get('/getCartProduct/:id',Validation(paramValidations.getCartProduct), getCartProduct);
router.patch('/deleteProduct/:id' ,Validation(paramValidations.deleteCartProduct), deleteProductFromCart);
router.patch('/updateQuantity/:id',Validation(paramValidations.updateQuantity), updateQuantity);

export default router;