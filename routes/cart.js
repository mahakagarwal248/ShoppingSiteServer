import express from "express";
import multer from "multer";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import {
  addToCart,
  deleteProductFromCart,
  getCartProduct,
  updateQuantity,
} from "../controllers/Cart.js";
const storage = multer.memoryStorage();
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router
  .route("/addToCart")
  .get(Validation(paramValidations.addToCart), addToCart);

router
  .route("/getCartProduct")
  .get(Validation(paramValidations.getCartProduct), getCartProduct);

router
  .route("/deleteProduct")
  .delete(
    Validation(paramValidations.deleteCartProduct),
    deleteProductFromCart
  );

router
  .route("/updateQuantity")
  .get(Validation(paramValidations.updateQuantity), updateQuantity);

export default router;
