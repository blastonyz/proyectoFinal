import {Server} from 'socket.io';
import productManager from './productManager.js';

let socketServer;

export const emit = (event,data) => {
    socketServer.emit(event,data)
}

export const init = (httpServer) => {
     socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        const productList = await productManager.getProducts();

        console.log(`Nuevo cliente conectado ${socketClient.id}`);
        //envio lista completa
        socketClient.emit('List', productList);
        //escucho el productoa agregar,agrergo,vuelvo a emitir lista completa
        socketClient.on('product-add',async (newProduct) =>{
            try {
                console.log(`CLiente envio un mensaje: ${newProduct}`);
                await productManager.addProduct(newProduct);
                emit('List', productList)
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
                prodFind = await productManager.getProductsbyId(findId);
                emit('find', prodFind)
            } catch (error) {
                console.error('error al añadir producto',error)
            }
        })

        socketClient.on('products-delete',async (deleteId) =>{
            console.log(`CLiente envio un mensaje: ${deleteId}`);
            try {
                console.log(`CLiente envio un mensaje: ${deleteId}`);
                await productManager.deleteProduct(deleteId);
                emit('List', deleteId)
            } catch (error) {
                console.error('error al añadir producto',error)
            }
        })
    })

}

