import path from "path";
import { fileURLToPath } from "url";

import userSchema from "../models/user.js";
import OTPVerificationSchema from "../models/otpVerification.js";
import { generateOtp } from "../helpers/OtpVerification.js";
import sendEmail from "../helpers/SendEmail.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const otpVerificationTemplate = path.join(
  __dirname,
  "../templates/otpVerification.ejs"
);

export const sendOtp = async (req, res) => {
  const { email } = req.query;

  try {
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser) return res.status(404).json("User not found");

    const existingOtp = await OTPVerificationSchema.findOne({
      userId: existingUser?._id,
      email,
    });
    const otp = await generateOtp();
    if (existingOtp) {
      if (existingOtp?.resends >= 5)
        return res
          .status(400)
          .json("OTP Limit Exceeded. Try again after sometime");

      await OTPVerificationSchema.findByIdAndUpdate(existingOtp._id, {
        otp,
        $inc: { resends: 1 },
      });
    } else {
      await OTPVerificationSchema.create({
        userId: existingUser?._id,
        email: existingUser?.email,
        mobile: existingUser?.mobile,
        otp,
      });
    }
    const mailData = {
      heading: "Otp To Reset Password",
      template: otpVerificationTemplate,
      websiteUrl: process.env["WEBSITE-URL"],
      name: existingUser?.name,
      email: existingUser?.email,
      otp,
    };
    sendEmail(mailData);
    return res.status(200).json("Otp sent successfully");
  } catch (error) {
    return res.status(400).json("Failed to send otp");
  }
};

export const verifyOtp = async (req, res) => {
  const { mobile, email, otp } = req.body;
  try {
    const existingUser = await userSchema.findOne({
      $or: [{ email }, { mobile }],
    });
    if (!existingUser) return res.status(404).json("User not found");

    const existingOtp = await OTPVerificationSchema.findOne({
      userId: existingUser?._id,
      $or: [{ email }, { mobile }],
    });
    if (!existingOtp)
      return res.status(404).json("Otp not found. Please resend the OTP");

    if (existingOtp.otp !== otp) {
      if (existingOtp?.verificationAttempts >= 3)
        return res
          .status(400)
          .json("Otp Limit Exceeded. Please try again after sometime");

      await OTPVerificationSchema.findByIdAndUpdate(existingOtp._id, {
        $inc: { verificationAttempts: 1 },
      });
      return res.status(400).json("Invalid Otp");
    }

    await OTPVerificationSchema.findByIdAndDelete(existingOtp._id);
    return res.status(200).json("Otp verified successfully");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
