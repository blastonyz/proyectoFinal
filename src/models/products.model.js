import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    code: {type: Number, required: true},
    stock: {type: Number, required: true},
    statusP: {type: Boolean, required: true},
    thumbnail: {type: Array},
},
{timestamps: true}
)

ProductSchema.plugin(mongoosePaginate);

export default  mongoose.model('Product',ProductSchema);