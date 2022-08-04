import express from 'express';
import multer from 'multer';
import {getAllProducts, addProducts, getProductsByCategory} from '../controllers/Products.js';
const storage = multer.memoryStorage()
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

router.post('/addProduct',upload.single('file'), addProducts)
router.get('/getAllProducts', getAllProducts);
router.get('/getProductByCategory/:id', getProductsByCategory)

export default router