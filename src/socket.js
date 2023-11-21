import {Server} from 'socket.io';
import ProductManager from './dao/ProductManagerMdb.js'
import MessageModel from './models/message.model.js';

export let socketServer;

export const emit = (event,data) => {
    socketServer.emit(event,data)
}

export const init = (httpServer) => {
     socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        
        let productList = await ProductManager.get();

        console.log(`Nuevo cliente conectado ${socketClient.id}`);
        //envio lista completa
        emit('List', productList);
        //escucho el productoa agregar,agrergo,vuelvo a emitir lista completa
        socketClient.on('product-add',async (newProduct) =>{
            try {
                console.log(`CLiente envio un mensaje `);
                await ProductManager.create(newProduct);
                let productList = await ProductManager.get();
                console.log("prodcuto agregado")
                emit('List', productList, console.log("nueva lista"));
            } catch (error) {
                console.error('error al añadir producto',error)
            }
          
        })

        socketClient.on('product-update', async (updateProduct) =>{
            console.log(`CLiente envio un mensaje:`);
            try {
                console.log(`CLiente envio un mensaje `);
                await ProductManager.updateById(updateProduct.id,updateProduct);
                let productList = await ProductManager.get();
                emit('List', productList, console.log("nueva lista"));
            } catch (error) {
                console.error('error al actualizar producto',error)
            }
        });

        socketClient.on('productsFind', async (findId) => {
            console.log(`Cliente envió un mensaje: ${findId}`);
            try {
                const prodFind = await ProductManager.getById(findId);
                if (prodFind) {
                    emit('find', prodFind);
                } else {
                    console.error("Id no encontrado");
                }
            } catch (error) {
                console.error('Error al buscar producto', error);
            }
        });

        socketClient.on('products-delete',async (deleteId) =>{
            console.log(`CLiente envio un mensaje: ${deleteId}`);
           
            try {
                
                await ProductManager.deleteById(deleteId);
                
            } catch (error) {
                console.error('error al borrar producto',error)
            }
            
            let productList = await ProductManager.get();
            emit('List', productList, console.log("nueva lista"));
        })
        //chat
        socketClient.on('clientMessage', async(message)=>{
            console.log("message", message);
            await MessageModel.create(message);
            const messages = await MessageModel.find({});
            console.log(messages);
            //probe con map y toJSON y tampoco renderizaba
            emit('DBmessages', messages);
        })
        

    })

}
