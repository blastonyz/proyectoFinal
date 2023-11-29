import mongoose from "mongoose";

const CartSchema =  new mongoose.Schema({
        products: [
                   { 
                        prodId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                        quantity: {type: Number,required: true},
                        _id: false
                   }
           
        ]

},{timestamps: true,});

export default mongoose.model('Carts',CartSchema);