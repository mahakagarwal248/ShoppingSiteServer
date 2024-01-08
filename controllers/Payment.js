import Razorpay from "razorpay";
import randomstring from "randomstring";

import transactionsSchema from "../models/transactions.js";
import ordersSchema from "../models/orders.js";
import productsSchema from "../models/products.js";
import cartSchema from "../models/cart.js";

var instance = new Razorpay({
  key_id: "rzp_test_AwDzw08aAMJ9qk",
  key_secret: "VWnf4qDQMyQyrkvOUQO3o8Fa",
});

export const initiatePayment = async (req, res) => {
  const { userId } = req.query;
  const order_id = randomstring.generate(12);
  try {
    const cartData = await cartSchema.findOne({ userId }).populate([
      {
        path: "products.productId",
        model: "Products",
      },
      {
        path: "userId",
        model: "User",
      },
    ]);

    let amount = 0;
    let orders = [];
    cartData.products.forEach(async (product) => {
      amount += product.productId.price * product.quantity;
      const createdOrder = await ordersSchema.create({
        userId,
        productId: product.productId,
        quantity: product?.quantity,
        amount: product.productId.price,
      });
      orders.push(createdOrder?._id);
    });

    var options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "eshop_" + order_id,
    };
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    const createPayment = await transactionsSchema.create({
      razorpayOrderId: order?.id,
      amount,
      userId,
      status: "INITIATED",
      purchaseOrderId: orders,
    });
    if (!createPayment) return res.status(500).send("Some error occured");
    return res.send({
      status: 200,
      data: { order, customerDetails: cartData.userId },
    });
  } catch (err) {
    return res.send({ status: 500, error: err?.message });
  }
};

export const paymentCallback = async (req, res) => {
  const {
    orderCreationId: orderId,
    razorpayPaymentId: paymentId,
    razorpaySignature,
  } = req.body;
  try {
    const getPaymentData = await instance.payments.fetch(paymentId);
    let status;
    if (getPaymentData.status === "captured") {
      status = "SUCCESS";
    } else if (getPaymentData.status === "failed") {
      status = "FAILED";
    } else if (getPaymentData.status === "refunded") {
      status = "REFUNDED";
    } else if (getPaymentData.status === "authorized") {
      status = "PENDING";
    }
    if (getPaymentData?.status !== "captured") {
      return res.send({
        status: 400,
        msg: `Payment ${getPaymentData?.status}`,
      });
    }
    const paymentInfo = await transactionsSchema
      .findOneAndUpdate(
        { razorpayOrderId: orderId },
        {
          paymentId,
          razorpaySignature,
          paymentGatewayRes: getPaymentData,
          status,
        },
        { new: true }
      )
      .populate({ path: "purchaseOrderId", model: "Orders" });

    if (!paymentInfo) return res.status(500).send("Some error occured");

    paymentInfo.purchaseOrderId.forEach(async (product) => {
      await ordersSchema.findOneAndUpdate(
        {
          _id: product._id,
        },
        {
          status: "CONFIRMED",
          dateOfPurchase: new Date(),
        }
      );
      await productsSchema.findOneAndUpdate(
        { _id: product.productId },
        { $inc: { quantity: -Number(product?.quantity || 0) } },
        { new: true }
      );
    });
    await cartSchema.findOneAndDelete({ userId: paymentInfo.userId });
    return res.send({
      status: 200,
      msg: "Payment successful!",
    });
  } catch (err) {
    return res.sendStatus(500).json(err?.message);
  }
};
