import express from "express";
import Validation from "../helpers/Validation.js";
import paramValidations from "../config/param-validations.js";
import { sendOtp, verifyOtp } from "../controllers/OtpVerification.js";

const router = express.Router();

router
  .route("/")
  .get(Validation(paramValidations.sendOtp), sendOtp)
  .post(Validation(paramValidations.verifyOtp), verifyOtp);

export default router;
