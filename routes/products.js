import express from "express";
import multer from "multer";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import {
  getAllProducts,
  addProducts,
  getProductsByCategory,
} from "../controllers/Products.js";

const storage = multer.memoryStorage();
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.post(
  "/addProduct",
  upload.single("file"),
  Validation(paramValidations.addProducts),
  addProducts
);
router.get("/getAllProducts", getAllProducts);
router.get(
  "/getProductByCategory/:id",
  Validation(paramValidations.getProductsByCategory),
  getProductsByCategory
);

export default router;
