import mongoose from "mongoose";

let expire = 1 * 60;

const OTPVerificationSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    otp: { type: String, default: "" },
    resends: { type: Number, default: 0 },
    verificationAttempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

OTPVerificationSchema.index({ updatedAt: 1 }, { expireAfterSeconds: expire });

export default mongoose.model("OtpVerification", OTPVerificationSchema);
