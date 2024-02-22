import {Server} from 'socket.io';
import MessageModel from './models/message.model.js';
import ProductController from './controller/products.controller.js';
import UsersController from './controller/users.controller.js';

export let socketServer;

export const emit = (event,data) => {
    socketServer.emit(event,data)
}

export const init = (httpServer) => {
     socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        
        let productList = await ProductController.get();

        console.log(`Nuevo cliente conectado ${socketClient.id}`);
        //envio lista completa
        emit('List', productList);
        //escucho el productoa agregar,agrergo,vuelvo a emitir lista completa
        socketClient.on('product-add',async (newProduct) =>{
            try {
                console.log(`CLiente envio un mensaje `);
                await ProductController.create(newProduct);
                let productList = await ProductController.get();
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
                await ProductController.updateById(updateProduct.id,updateProduct);
                let productList = await ProductController.get();
                emit('List', productList, console.log("nueva lista"));
            } catch (error) {
                console.error('error al actualizar producto',error)
            }
        });

        socketClient.on('productsFind', async (findId) => {
            console.log(`Cliente envió un mensaje: ${findId}`);
            try {
                const prodFind = await ProductController.getById(findId);
                if (prodFind) {
                    emit('find', prodFind);
                } else {
                    console.error("Id no encontrado");
                }
            } catch (error) {
                console.error('Error al buscar producto', error);
            }
        });
    socketClient.on('products-delete',async (deleteData) =>{
            console.log(`CLiente envio un mensaje: ${deleteData}`);
            
            const product = await ProductController.getById(deleteData.deleteId);
            const user = await UsersController.findById(deleteData.idUser);
            console.log('user', user);
            console.log('owner',product.owner); 
            const plainOwner = product.owner.toString();
            console.log('iduser', deleteData.idUser);
            try {
                if(user.role !== 'admin' && plainOwner !== deleteData.idUser){
                    console.error("producto solo puede ser borrado por creador");
                    return;
                }
                await ProductController.deleteById(deleteData.deleteId);
                
            } catch (error) {
                console.error('error al borrar producto',error);
                
            }
            
            let productList = await ProductController.get();
            emit('List', productList, console.log("nueva lista"));
        });
    
        //chat
        socketClient.on('clientMessage', async(message)=>{
            console.log("message", message);
            await MessageModel.create(message);
            const messages = await MessageModel.find({});
            console.log(messages);
            //probe con map y toJSON y tampoco renderizaba
            emit('DBmessages', messages);
        });
        
        
    })

}
