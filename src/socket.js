import {Server} from 'socket.io';
import productManager from './productManager.js';

let socketServer;

export const init = (httpServer) => {
     socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        const productList = await productManager.getProducts();

        console.log(`Nuevo cliente conectado ${socketClient.id}`);

        socketClient.emit('List', productList);

        socketClient.on('product-add',async (newProduct) =>{
            try {
                console.log(`CLiente envio un mensaje: ${newProduct}`);
                const productAdd = await productManager.addProduct(newProduct);
                socketServer.emit('added', productAdd)
            } catch (error) {
                console.error('error al añadir producto',error)
            }
           
        })

        socketClient.on('product-update', async (updateProduct) =>{
            console.log(`CLiente envio un mensaje: ${updateProduct}`);
           
        })

        socketClient.on('products-find', async (findId) =>{
            console.log(`CLiente envio un mensaje: ${findId}`);
            try {
                console.log(`CLiente envio un mensaje: ${findId}`);
                const productFind = await productManager.getProductsbyId(findId);
                socketServer.emit('added', productFind)
            } catch (error) {
                console.error('error al añadir producto',error)
            }
        })

        socketClient.on('products-delete',async (deleteId) =>{
            console.log(`CLiente envio un mensaje: ${deleteId}`);
            try {
                console.log(`CLiente envio un mensaje: ${deleteId}`);
                const productDelete = await productManager.deleteProduct(deleteId);
                socketServer.emit('added', productDelete)
            } catch (error) {
                console.error('error al añadir producto',error)
            }
        })
    })
     
}

export const emit = (event,data) => {
        socketServer.emit(event,data)
}