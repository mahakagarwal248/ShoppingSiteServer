import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    updated: { type: Date, default: Date.now },
    img: {
      data: Buffer,
      contentType: String,
    },
    colors: [{ type: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
