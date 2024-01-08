import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          default: null,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
