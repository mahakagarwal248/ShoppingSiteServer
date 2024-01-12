import express from "express";

import userRoutes from "./user.js";
import productRoutes from "./products.js";
import cartRoutes from "./cart.js";
import wishlistRoutes from "./wishlist.js";
import imageRoutes from "./images.js";
import businessProfileRoutes from "./businessProfile.js";
import paymentRoutes from "./payment.js";
import orderRoutes from "./orders.js";
import otpVerificationRoutes from "./otpVerification.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/images", imageRoutes);
router.use("/business-profile", businessProfileRoutes);
router.use("/payment", paymentRoutes);
router.use("/orders", orderRoutes);
router.use("/otp-verification", otpVerificationRoutes);

export default router;
