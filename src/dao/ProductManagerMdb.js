import ProductModel from '../models/products.model.js'

export default class ProductManagerMdb{
    static get(){
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
}