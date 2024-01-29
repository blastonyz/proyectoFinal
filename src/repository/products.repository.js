

export default class ProductsRepository{
    constructor(dao){
        this.dao = dao;
    }
    async getPaginated(criterials, options){
        
        return this.dao.getPaginated(criterials, options);
    }
    async getById(sid){
       
        return this.dao.getById(sid);
    }
    async create(data){
       
        return this.dao.create(data);
    }
    async updateById(sid,data){
       return this.dao.updateById(sid,data);
    }
    async deleteById(sid){
       return this.dao.deleteById(sid);
    }
    async get(){
        return this.dao.get();
    }
    async findAndUpdate(sid,data){
       return this.dao.findAndUpdate(sid,data);
    }
    async getPopulate(sid){
        return this.dao.getPopulate(sid);
    }
}