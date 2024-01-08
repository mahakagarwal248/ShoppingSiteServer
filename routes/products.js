import express from "express";
import multer from "multer";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import {
  getAllProducts,
  addProducts,
  getProductsByCategory,
  getProductsOfMerchant,
  getProductById,
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
router.route("/getMerchantProducts").get(getProductsOfMerchant);
router.route("/getAllProducts").get(getAllProducts);
router
  .route("/getProductById")
  .get(Validation(paramValidations.getProductById), getProductById);

router.get(
  "/getProductByCategory/:id",
  Validation(paramValidations.getProductsByCategory),
  getProductsByCategory
);

export default router;
