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
      email: joi.string().email().required(),
      newPW: joi.string().required(),
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
    }
  }),
  getProductsByCategory: joi.object({
    params:{
      id: joi.string().required()
    }
  }),
  addToCart: joi.object({
    params: {
      id: joi.string().required(),
    },
    body: {
      productData: {
        name: joi.string().required(),
        description: joi.string().required(),
        brand: joi.string(),
        price: joi.number().required(),
        quantity: joi.number().required(),
        userId: joi.string().required(),
      },
    },
  }),
  getCartProduct: joi.object({
    params: {
      id: joi.string().required(),
    },
  }),
  deleteCartProduct: joi.object({
    params: {
      id: joi.string().required(),
    },
  }),
  updateQuantity: joi.object({
    params: {
      id: joi.string().required(),
    },
    body: {
      quantity: joi.number().required(),
    },
  }),
  addToWishlist: joi.object({
    params: {
      id: joi.string().required(),
    },
    body: {
      productData: {
        name: joi.string().required(),
        description: joi.string().required(),
        brand: joi.string(),
        price: joi.number().required(),
        userId: joi.string().required(),
      },
    },
  }),
  getWishlistProduct: joi.object({
    params: {
      id: joi.string().required(),
    },
  }),
  deleteWishlistProduct: joi.object({
    params: {
      id: joi.string().required(),
    },
  }),
};
