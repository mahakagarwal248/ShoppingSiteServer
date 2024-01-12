import express from "express";

import validate from "../helpers/Validation.js";
import paramValidation from "../config/param-validations.js";
import {
  signup,
  login,
  forgotPassword,
  changePassword,
  fetchSecurityQues,
  getAllUsers,
} from "../controllers/Users.js";

const router = express.Router();

router.post("/signup", validate(paramValidation.createUser), signup);
router.post("/login", validate(paramValidation.loginUser), login);
router.get("/getAllUsers", getAllUsers);
router.get(
  "/getSecurityQues/:email",
  validate(paramValidation.getSecurityQuestion),
  fetchSecurityQues
);
router.post(
  "/forgotPassword",
  validate(paramValidation.forgotPassword),
  forgotPassword
);
router
  .route("/changePassword")
  .put(validate(paramValidation.changePassword), changePassword);

export default router;
