import joi from "joi";

export default {
  createUser: joi.object({
    body: {
      name: joi.string().max(25).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      mobile: joi
        .string()
        .length(10)
        .required()
        .regex(/^[0-9]*$/),
      address: joi.string(),
      securityQues: joi.string().required(),
      securityAns: joi.string().required(),
    },
  }),
  loginUser: joi.object({
    body: joi.object().required(),
  }),
  getSecurityQuestion: joi.object({
    params: {
      email: joi.string().email().required(),
    },
  }),
  forgotPassword: joi.object({
    body: {
      email: joi.string().email().required(),
      ans: joi.string().required(),
    },
  }),
  changePassword: joi.object({
    body: {
      oldPassword: joi.string(),
      email: joi.string().email().required(),
      newPassword: joi.string().required(),
    },
  }),
  addProducts: joi.object({
    body: {
      productData: {
        name: joi.string().required(),
        description: joi.string().required(),
        category: joi.string().required(),
        price: joi.number().required(),
        quantity: joi.number().required(),
        brand: joi.string(),
      },
    },
  }),
  updateProduct: joi.object({
    body: {
      merchantId: joi.string().required(),
      productId: joi.string().required(),
      description: joi.string().required(),
      quantity: joi.number().required(),
    },
  }),
  deleteProduct: joi.object({
    query: {
      merchantId: joi.string().required(),
      productId: joi.string().required(),
    },
  }),
  getProductsByCategory: joi.object({
    params: {
      id: joi.string().required(),
    },
  }),
  getProductById: joi.object({
    query: {
      productId: joi.string().required(),
    },
  }),
  addToCart: joi.object({
    query: {
      userId: joi.string().required(),
      productId: joi.string().required(),
    },
  }),
  getCartProduct: joi.object({
    query: {
      userId: joi.string().required(),
    },
  }),
  deleteCartProduct: joi.object({
    query: {
      userId: joi.string().required(),
      productId: joi.string().required(),
    },
  }),
  updateQuantity: joi.object({
    query: {
      userId: joi.string().required(),
      productId: joi.string().required(),
      quantity: joi.number().required(),
    },
  }),
  addToWishlist: joi.object({
    query: {
      userId: joi.string().required(),
      productId: joi.string().required(),
    },
  }),
  getWishlistProduct: joi.object({
    query: {
      userId: joi.string().required(),
    },
  }),
  deleteWishlistProduct: joi.object({
    query: {
      userId: joi.string().required(),
      productId: joi.string().required(),
    },
  }),
  initiatePayment: joi.object({
    query: {
      userId: joi.string().required(),
    },
  }),
  paymentCallback: joi.object({
    body: {
      orderCreationId: joi.string().required(),
      razorpayPaymentId: joi.string().required(),
      razorpaySignature: joi.string().required(),
    },
  }),
  getUserOrders: joi.object({
    query: {
      userId: joi.string().required(),
    },
  }),
  sendOtp: joi.object({
    query: {
      email: joi.string().required(),
    },
  }),
  verifyOtp: joi.object({
    body: {
      otp: joi.string().required(),
      mobile: joi.string().allow("").allow(null),
      email: joi.string().required().allow("").allow(null),
    },
  }),
};
