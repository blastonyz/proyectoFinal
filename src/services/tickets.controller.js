import TicketsRepository from "../repository/tickets.repository.js";
import TicketsDao from "../dao/tickets.dao.js";
import CartController from "../controller/carts.controller.js";
import ProductController from "../controller/products.controller.js";
import { v4 as uuidv4 } from 'uuid';
 

const ticketsRepository = new TicketsRepository(TicketsDao);

export default class TicketsController {
    static async compare(cartId) {
        try {
            const cart = await CartController.getPopulate(cartId);
            console.log('cart', cart);
            const productList = await ProductController.get();

            return Promise.all(cart.products.map(async (productInCart) => {
                const productInList = productList.find(p => p._id.toString() === productInCart.prodId._id.toString());

                if (!productInList) {
                    console.error(`Product with prodId ${productInCart.prodId} not found in the product `)
                }

                if (productInCart.quantity < productInList.stock) {
                    return {
                        subTotal: productInList.price * productInCart.quantity,
                        quantity: productInCart.quantity,
                        data: productInCart
                    };
                } else {
                    return {
                        prodId: productInCart.prodId._id.toString(),
                        quantity: productInCart.quantity
                    };
                }
            }));
        } catch (error) {
            console.error('Error:', error); 
            throw error;
            
        }
    }
    static async succesStock(cartId) {
        try{
            const compareResults = await TicketsController.compare(cartId);

            const productsForRender = await Promise.all(compareResults.filter(elem => elem && elem.data));
            console.log('data', productsForRender);
    
            const notStock = compareResults
                .filter(result => result && !result.subTotal)
                .map(result => ({ prodId: result.prodId, quantity: result.quantity }));
            console.log('notstock', { notStock });
    
            const dataRender = { yes: { productsForRender }, no: { notStock } };
            return dataRender;
        }catch(error){
            console.error('Error:', error);
            throw new Error('Carrito no encontrado');
        }
       
    }

    static async Purchase(cartId, email) {
        try {
            const result = await TicketsController.succesStock(cartId);
            console.log('result',{result})
            const stockResults = await Promise.all(result.yes.productsForRender.map(async (prod) => {
                const _id = prod.data.prodId._id
                const productInList = await ProductController.getById(_id);

                const newStock = productInList.stock - prod.quantity;

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

               

                return {
                    price: prod.subTotal,
                    updateProduct: ProductController.findAndUpdate(_id, data),
                };
            }));

           // console.log('stockRes',{stockResults});
            const total = stockResults.reduce((acc, val) => acc + val.price, 0);
            console.log('total',total);
            const purchaseData = {
                code: uuidv4(),
                amount: total,
                purchaser: email,
            };

            await CartController.updateCart({ _id: cartId }, result.no.notStock);

            return await ticketsRepository.create(purchaseData);
        } catch (error) {
            console.error('Error:', error);
        }
        }
    }









