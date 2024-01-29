import ProductController from "../controller/products.controller.js";

export default class CartDTO {
    constructor(succesResult) {
        this.productsForRender = this.mapProductsForRender(succesResult.yes.productsForRender);
        this.notStock = this.mapNotStock(succesResult.no.notStock);
    }

    mapProductsForRender(productsForRender) {
        return productsForRender.map(product => ({
            id: product.data.prodId._id,
            title: product.data.prodId.title,
            description: product.data.prodId.description,
            price: product.data.prodId.price,
            category: product.data.prodId.category,
            code: product.data.prodId.code,
            stock: product.data.prodId.stock,
            statusP: product.data.prodId.statusP,
            quantity: product.quantity,
            subTotal: product.subTotal
        }));
    }

    async mapNotStock(notStock) {
        const productDetailsPromises = notStock.map(async (result) => {
            const product = await ProductController.getById(result.prodId);
    
            return {
                prodId: {
                    _id: product._id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    code: product.code,
                    stock: product.stock,
                    statusP: product.statusP,
                    thumbnail: product.thumbnail
                },
                quantity: result.quantity
            };
        });
    
        const populatedNotStock = await Promise.all(productDetailsPromises);
        return populatedNotStock;
    }
}