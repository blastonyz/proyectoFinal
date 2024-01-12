import ProductManagerMdb from "../dao/ProductManagerMdb.js";

export default class ProductController {
    static get(){
        return ProductManagerMdb.get();
    }

    static getPaginated(criterials,options){
        return ProductManagerMdb.getPaginated(criterials, options)
    }

    static getById(sid){
      
        return ProductManagerMdb.getById(sid);
    }

    static create(data){
        
        return ProductManagerMdb.create(data);
    }
    static updateById(sid,data){
       return ProductManagerMdb.updateById({_id: sid}, {$set: data });
    }
    static deleteById(sid){
        return ProductManagerMdb.deleteOne({_id: sid});
    }
}

