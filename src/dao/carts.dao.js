import CartModel from '../models/carts.models.js';
import CartRepository from '../repository/carts.repository.js';

export default class CartDao extends CartRepository{
    static getById(cartId){
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
    static getPopulate(_id){
        return   CartModel.findById(_id).populate('products.prodId')
    }
}