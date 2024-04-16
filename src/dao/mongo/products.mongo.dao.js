import ProductModel from '../../models/products.model.js';
import ProductsDao from '../products.dao.js';

export default class ProductsMongoDao extends ProductsDao{
     async get(){
        return ProductModel.find();
    }
     async getPaginated(criterials, options){
        const productPaginated = await ProductModel.paginate(criterials,options);
        return productPaginated;
    }
     async getById(sid){
        const product = await ProductModel.findById(sid);
        if(!product){
            throw new Error('Producto no encontrado');
        }
        return product;
    }
     async create(data){
        const newProduct = await ProductModel.create(data);
        console.log(`Prodcuto creado: ${newProduct}`);
        return newProduct;
    }
     async updateById(sid,data){
        await ProductModel.updateOne({_id: sid}, {$set: data });
        console.log(`Producto actualizado: ${sid}`);
    }
     async deleteById(sid){
        await ProductModel.deleteOne({_id: sid});
        console.log(`Producto eliminado: ${sid}`)
    }
     async findAndUpdate(sid,data){
        const updatedProduct = await ProductModel.findByIdAndUpdate(sid, { $set: data }, { new: true });
        console.log(`Producto del id actualizado: ${sid}`);
        return updatedProduct;
    }
     async getPopulate(sid) {
        const populated = await ProductModel.findById(sid).populate('Product'); 
        return populated;
    }
}