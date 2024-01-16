import CartDao from '../dao/carts.dao.js';

export default class CartController{
    static GetById(cartId){
        return CartDao.getById(cartId);
        
    }

    static create({}){
        return CartDao.create({});
    }

    static update(_id,update){
        return CartDao.update(_id,update);
    }

    static delete(_id){
        return CartDao.delete(_id);
    }
}