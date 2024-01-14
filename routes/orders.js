import express from "express";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import { getMerchantOrders, getUserOrders } from "../controllers/Orders.js";

const router = express.Router();

router
  .route("/")
  .get(Validation(paramValidations.getUserOrders), getUserOrders);

router
  .route("/merchant")
  .get(Validation(paramValidations.getMerchantOrders), getMerchantOrders);

export default router;
