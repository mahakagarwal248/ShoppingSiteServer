import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    initialQuantity: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    updated: { type: Date, default: Date.now },
    img: {
      data: Buffer,
      contentType: String,
    },
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    colors: [{ type: String }],
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
