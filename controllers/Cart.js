import mongoose from 'mongoose'
import cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    const {productData} = req.body;
    const {name, description, brand, price, quantity, userId} = productData;
    var img = {
        data: req.body.productData.img.data,
        contentType: req.body.productData.img.contentType,
      }
    const addProductToCart = new cart({name, description, brand, price, quantity, userId, productId: _id, img});

    try {
        await addProductToCart.save();
        res.status(200).json("Added to cart successfully")
    } catch (error) {
        console.log(error)
        res.status(400).json("Couldn't add product to cart")
    }
}

export const getCartProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const cartProductList = await cart.find();
        const cartProducts = cartProductList.filter((cart) => cart.userId === id)
        res.status(200).json(cartProducts);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

export const deleteProductFromCart = async (req,res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    try {
        await cart.findByIdAndRemove(_id);
        res.status(200).json({message: 'Successfully deleted'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateQuantity = async (req, res) => {
    const {id: _id} = req.params;
    const quantity = req.body;
    const number = parseInt(quantity.quantity)

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    try {
        await cart.findByIdAndUpdate(_id, {$set: {'quantity': number}});
        res.status(200).json({message: 'Successfully updated'});
    } catch (error) {
        console.log(error)
    }
}