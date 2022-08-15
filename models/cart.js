import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String },
    userId: {  type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    productId: {  type: mongoose.Schema.Types.ObjectId, ref: 'products', default: null },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
