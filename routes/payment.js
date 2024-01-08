import express from "express";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import { initiatePayment, paymentCallback } from "../controllers/Payment.js";

const router = express.Router();

router
  .route("/initiate")
  .get(Validation(paramValidations.initiatePayment), initiatePayment);
router
  .route("/callback")
  .post(Validation(paramValidations.paymentCallback), paymentCallback);

export default router;
