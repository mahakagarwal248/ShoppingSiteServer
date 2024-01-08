import mongoose from "mongoose";

const businessProfileSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    socialMediaLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    contactDetails: {
      email: { type: String, default: "" },
      mobile: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Businessprofile", businessProfileSchema);
