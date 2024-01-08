import express from "express";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import { getUserOrders } from "../controllers/Orders.js";

const router = express.Router();

router
  .route("/")
  .get(Validation(paramValidations.getUserOrders), getUserOrders);

export default router;
