import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    securityQues: { type: String, required: true },
    securityAns: { type: String, required: true },
    profilePicture: {
      data: Buffer,
      contentType: String,
      default: {},
    },
    role: { type: String, enum: ["customer", "merchant"] },
    businessProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessProfile",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
