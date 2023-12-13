import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String},
    email: {type: String, required: true},
    age: {type: Number},
    password: {type: String},
    role: {type: String, default: 'user'}
},
{timestamps: true}
)

export default  mongoose.model('Session',UserSchema);