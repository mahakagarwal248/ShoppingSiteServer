import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    razorpayOrderId: { type: String, required: true },
    paymentId: { type: String, default: "" },
    purchaseOrderId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
    status: {
      type: String,
      default: "INITIATED",
      enum: ["INITIATED", "PENDING", "CAPTURED", "SUCCESS", "FAILURE"],
    },
    amount: { type: Number, default: 0 },
    razorpaySignature: { type: String, default: "" },
    paymentGatewayRes: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Transactions", transactionSchema);
