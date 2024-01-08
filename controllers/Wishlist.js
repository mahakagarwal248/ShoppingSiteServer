import mongoose from "mongoose";
import wishlist from "../models/wishlist.js";

export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send("product unavailable...");
  }
  const existingWishlist = await wishlist.findOne({ userId });
  if (existingWishlist) {
    const existingProduct = existingWishlist.products.filter((item) => {
      console.log(item);
      return item.toString() === productId;
    });
    if (existingProduct && existingProduct?.length > 0) {
      return res.status(400).json("Product already exist in the wishlist");
    }
    await wishlist.updateOne({ userId }, { $push: { products: productId } });
    return res.status(200).json("Added to cart successfully");
  }

  const wishlistData = {
    userId,
    products: [productId],
  };

  try {
    await wishlist.create(wishlistData);
    res.status(200).json("Added to Wishlist successfully");
  } catch (error) {
    res.status(400).json("Couldn't add product to Wishlist");
  }
};

export const getWishlistProduct = async (req, res) => {
  const { userId } = req.query;
  try {
    const wishlistProducts = await wishlist
      .findOne({ userId })
      .populate({ path: "products", model: "Products" })
      .lean();
    return res.status(200).json(wishlistProducts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteProductFromWishlist = async (req, res) => {
  const { userId, productId } = req.query;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send("User does not exist");
  }

  try {
    await wishlist.updateOne(
      {
        userId,
      },
      {
        $pull: { products: productId },
      }
    );
    res.status(200).json("Product deleted Successfully");
  } catch (error) {
    res.status(404).json(error.message);
  }
};
