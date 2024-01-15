import CartModel from '../models/carts.models.js';

export default class CartController{
    static GetById(cartId){
        return CartModel.findById(cartId);
        
    }

    static create({}){
        return CartModel.create({});
    }

    static update(_id,update){
        return CartModel.updateOne({_id},update);
    }

    static delete(_id){
        return CartModel.deleteOne({_id});
    }
}