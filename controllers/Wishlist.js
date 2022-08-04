import mongoose from 'mongoose'
import wishlist from "../models/wishlist.js";

export const addToWishlist = async (req, res) => {
    const {id: _id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    const {productData} = req.body;
    const {name, description, brand, price, userId} = productData
    var img = {
        data: req.body.productData.img.data,
        contentType: req.body.productData.img.contentType,
      }
    const addProductToWishlist = new wishlist({name, description, brand, price, userId, productId: _id,img});

    try {
        await addProductToWishlist.save();
        res.status(200).json("Added to Wishlist successfully")
    } catch (error) {
        res.status(400).json("Couldn't add product to Wishlist")
    }
}

export const getWishlistProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const wishlistProductList = await wishlist.find();
        const wishlistProducts = wishlistProductList.filter((wishlist) => wishlist.userId === id)
        res.status(200).json(wishlistProducts);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

export const deleteProductFromWishlist = async (req,res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    try {
        await wishlist.findByIdAndRemove(_id);
        res.status(200).json({message: 'Successfully deleted'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}