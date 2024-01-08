import mongoose from "mongoose";
import cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send("product unavailable...");
  }

  const existingCart = await cart.findOne({ userId });
  if (existingCart) {
    const existingProduct = existingCart.products.filter(
      (item) => item?.productId.toString() === productId
    );
    if (existingProduct && existingProduct?.length > 0) {
      return res.status(400).json("Product already exist in the cart");
    }
    await cart.updateOne(
      { userId },
      { $push: { products: { productId, quantity: 1 } } }
    );
    return res.status(200).json("Added to cart successfully");
  }
  const cartData = {
    userId,
    products: [{ productId, quantity: 1 }],
  };

  try {
    await cart.create(cartData);
    return res.status(200).json("Added to cart successfully");
  } catch (error) {
    return res.status(400).json("Couldn't add product to cart");
  }
};

export const getCartProduct = async (req, res) => {
  const { userId } = req.query;
  try {
    const cartProductList = await cart
      .findOne({ userId })
      .populate({ path: "products.productId", model: "Products" })
      .lean();
    return res.status(200).json(cartProductList);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { userId, productId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send("product unavailable...");
  }

  try {
    await cart.updateOne(
      {
        userId,
        "products.productId": productId,
      },
      {
        $pull: { products: { productId: productId } },
      }
    );
    return res.status(200).json("Product Successfully deleted from cart");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const updateQuantity = async (req, res) => {
  const { productId, userId, quantity } = req.query;
  const number = Number(quantity);
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send("product unavailable...");
  }

  try {
    await cart.updateOne(
      {
        userId,
        "products.productId": productId,
      },
      {
        $set: { "products.$.quantity": number },
      }
    );
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
