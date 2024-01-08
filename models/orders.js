import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    quantity: { type: Number, default: 1 },
    dateOfPurchase: { type: Date, default: "" },
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", ordersSchema);
