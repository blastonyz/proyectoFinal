import TicketsRepository from "../repository/tickets.repository.js";
import TicketsDao from "../dao/tickets.dao.js";
import CartController from "../controller/carts.controller.js";
import ProductController from "../controller/products.controller.js";
import { v4 as uuidv4 } from 'uuid';
/*
const ticketsRepository = new TicketsRepository(TicketsDao);

export default class TicketsController{

    static async Purchase(cartId,email){
        try {
        const cart = await CartController.getPopulate(cartId);
        console.log('cart', cart);
        const productList = await ProductController.get();
     
        const okStock = [];
        const notStock = [];

        for (const productInCart of cart.products) {
            const productInList = productList.find(p => p._id.toString() === productInCart.prodId._id.toString());

            if (!productInList) {
               
                console.error(`Product with prodId ${productInCart.prodId} not found in the product list.`);
                continue;
            }

            if (productInCart.quantity < productInList.stock) {
                
                const newStock = productInList.stock - productInCart.quantity;
                const data = {title: productInList.title ,
                              description:productInList.description ,
                              price: productInList.price ,
                              category: productInList.category ,
                              code: productInList.code ,
                              stock: newStock,
                              StatusP: productInList.statusP ,
                              thumbnail: productInList.thumbnail   
                            }
                const _id = productInList._id.toString();     
             
                okStock.push(productInList.price*productInCart.quantity);     
                await ProductController.findAndUpdate(_id, data)
            } else {

                notStock.push({
                   prodId: productInCart.prodId,
                   quantity: productInCart.quantity});
               
            }
        }
        
        //multiplicar por cantidad
        const total = okStock.reduce((acc,val) => acc + val,0);
        const purchaseData = {
            code: uuidv4(),
            amount : total,
            purchaser: email
        }

        console.log('okStock', okStock);
        console.log('notStock', notStock);
      
        await CartController.updateCart({_id: cartId},notStock)
        return await ticketsRepository.create(purchaseData);
    } catch (error) {
        console.error('Error:', error);
    }
    }
}
*/


const ticketsRepository = new TicketsRepository(TicketsDao);

export default class TicketsController {
    static async Purchase(cartId, email) {
        try {
            const cart = await CartController.getPopulate(cartId);
            console.log('cart', cart);
            const productList = await ProductController.get();

            const stockOperations = cart.products.map(async (productInCart) => {
                const productInList = productList.find(p => p._id.toString() === productInCart.prodId._id.toString());

                if (!productInList) {
                    console.error(`Product with prodId ${productInCart.prodId} not found in the product list.`);
                   
                }

                if (productInCart.quantity < productInList.stock) {
                    const newStock = productInList.stock - productInCart.quantity;
                    const data = {
                        title: productInList.title,
                        description: productInList.description,
                        price: productInList.price,
                        category: productInList.category,
                        code: productInList.code,
                        stock: newStock,
                        StatusP: productInList.statusP,
                        thumbnail: productInList.thumbnail
                    };
                    const _id = productInList._id.toString();
                    return {
                        price: productInList.price * productInCart.quantity,
                        updateProduct: ProductController.findAndUpdate(_id, data)
                    };
                } else {
                    return {
                        prodId: productInCart.prodId,
                        quantity: productInCart.quantity
                    };
                }
            });
           
            const stockResults = await Promise.all(stockOperations);
            console.log('stocksResults',stockResults);
            
            const okStock = stockResults
                .filter(result => result && result.price)
                .map(result => result.price);
            console.log('okstock',{okStock})    
            const notStock = stockResults
                .filter(result => result && !result.price)
                .map(result => ({ prodId: result.prodId, quantity: result.quantity }));
                console.log('notstock',{notStock});
            // total de compra
            const total = okStock.reduce((acc, val) => acc + val, 0);
            const purchaseData = {
                code: uuidv4(),
                amount: total,
                purchaser: email
            };

           

            await CartController.updateCart({ _id: cartId }, notStock);
            return await ticketsRepository.create(purchaseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}