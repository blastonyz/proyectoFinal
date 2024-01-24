
export default class CartRepository {
    constructor(dao){
        this.dao= dao;
    }
    async getById(cartId) {
        return this.dao.getById(cartId);
    }
    async create(cartData) {
        return this.dao.create(cartData);
    }
    async update(_id, update) {
        return this.dao.update(_id,update);
    }
    async delete(_id) {
        return this.dao.delete(_id);
    }
    async getPopulate(_id) {
        return this.dao.getPopulate(_id);
    }
  }
  