import ProductModel from '../models/products.model.js';
import ProductsRepository from '../repository/products.repository.js';

export default class ProductManagerMdb extends ProductsRepository{
    static async get(){
        return ProductModel.find();
    }
    static async getPaginated(criterials, options){
        const productPaginated = await ProductModel.paginate(criterials,options);
        return productPaginated;
    }
    static async getById(sid){
        const product = await ProductModel.findById(sid);
        if(!product){
            throw new Error('Producto no encontrado');
        }
        return product;
    }
    static async create(data){
        const newProduct = await ProductModel.create(data);
        console.log(`Prodcuto creado: ${newProduct}`);
        return newProduct;
    }
    static async updateById(sid,data){
        await ProductModel.updateOne({_id: sid}, {$set: data });
        console.log(`Producto actualizado: ${sid}`);
    }
    static async deleteById(sid){
        await ProductModel.deleteOne({_id: sid});
        console.log(`Producto eliminado: ${sid}`)
    }
    static async findAndUpdate(sid,data){
        const updatedProduct = await ProductModel.findByIdAndUpdate(sid, { $set: data }, { new: true });
        console.log(`Producto del id actualizado: ${sid}`);
        return updatedProduct;
    }
    static async getPopulate(sid) {
        const populated = await ProductModel.findById(sid).populate('Product'); 
        return populated;
    }
}