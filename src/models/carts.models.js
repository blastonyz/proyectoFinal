import mongoose from "mongoose";

const CartSchema =  new mongoose.Schema({
        products: [
           { prodId: {type: mongoose.Schema.Types.ObjectId, ref: '_id'},
             quantity: {type: Number,required: true},
        },
           
        ]

},{timestamps: true,});

export default mongoose.model('Carts',CartSchema);