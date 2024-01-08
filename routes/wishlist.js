import express from "express";
import multer from "multer";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import {
  addToWishlist,
  deleteProductFromWishlist,
  getWishlistProduct,
} from "../controllers/Wishlist.js";
const storage = multer.memoryStorage();
const router = express.Router();
const app = express();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router
  .route("/add")
  .get(Validation(paramValidations.addToWishlist), addToWishlist);

router
  .route("/")
  .get(Validation(paramValidations.getWishlistProduct), getWishlistProduct)
  .delete(
    Validation(paramValidations.deleteWishlistProduct),
    deleteProductFromWishlist
  );

export default router;
