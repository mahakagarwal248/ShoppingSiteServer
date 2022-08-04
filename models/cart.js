import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  brand: { type: String },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("Cart", cartSchema);
