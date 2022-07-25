import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
    name:{type:String, required: true},
    description:{type:String, required: true},
    price:{type:Number, required: true},
    brand:{type:String},
    userId:{type:String, required:true},
    productId:{type:String, required:true}
})

export default mongoose.model("Wishlist", wishlistSchema);