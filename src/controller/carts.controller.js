import CartDao from '../dao/carts.dao.js';
import CartRepository from '../repository/carts.repository.js';

const cartRepository = new CartRepository(CartDao);

export default class CartController{
    
    static async createCart(productId, quantity,cartId){
       //crea y añade a mongodb
        console.log('cartID',cartId);
       
        try {
        
              let existingCart = await cartRepository.getById(cartId);
    
              console.log('carrito',existingCart);  
              
              if(!existingCart){   
              res.status(404).json({ message: 'carrito o usuario no encontrados' });
              }else{
                let existProductInd =  existingCart.products.findIndex( (p) => p.prodId && p.prodId.toString()   === productId );
                console.log('indice',existProductInd);
                  if(existProductInd < 0){
                   const added = await cartRepository.update({
                        _id: existingCart._id,},{
                       $push:{products: {prodId: productId,quantity:quantity}}
                        }
                       );
                       return {newCart: added};
                  }else{
                  existingCart.products[existProductInd] = {prodId: existingCart.products[existProductInd].prodId, quantity: existingCart.products[existProductInd].quantity + quantity };
                  
                  await cartRepository.update({
                    _id: existingCart._id,},
                   
                   {products: existingCart.products }
                    
                   );
                  return {newCart: existingCart}; 
                  }
            }
            } catch (error) {
            console.error(error);
           throw new Error;
        
            }
    }

    static async deleteProduct(_id,pId){
        //eliminar el producto seleccionado del carrito
        try {
            let existingCart = await cartRepository.getById(_id);
            console.log('carrito',existingCart);
            let existProductInd = existingCart.products.findIndex( (p) => p.prodId+"" === pId );
            console.log('indice',existProductInd);
            existingCart.products.splice(existProductInd,1);
            console.log('mutado',existingCart);
            const productDelete = await cartRepository.update({
                _id: existingCart._id,},{
               $set:{products: existingCart.products}
                }
               );
               return productDelete;
            }catch (error) {
               throw new Error;
            }
    }


    static async deleteCart(_id){
        //lo actualizamos a vacio, para evitar su posterior creacion 
        return await cartRepository.update(_id,{products:[]} );
    }


    static async updateCart(_id, newProducts){
        //actualiza products con un array
        let existingCart = await cartRepository.getById(_id);
       
        if(!existingCart){
            
            throw new Error('carrito no ecnotrado');
        }
        const newCart = await cartRepository.update({
            _id: existingCart._id,},{
           $set:{products: newProducts}
            }
           );
            return newCart;
    }

   static async updateQuantity(_id, pId, newQuantity){
    try {
        let existingCart = await cartRepository.getById(_id);
        console.log('carrito',existingCart);
        if (!existingCart) {
            throw new Error('Carrito no encontrado' );
        }
        let existProductInd = existingCart.products.findIndex( (p) => p.prodId+"" === pId );
        console.log('indice',existProductInd);
       existingCart.products[existProductInd].quantity = newQuantity;
        console.log('mutado',existingCart);
        return await cartRepository.update(_id, {
            $set:{products: existingCart.products}
             });
    }  catch (error) {
    throw new Error('error al actualizar cantidad');
    
    }

    }
    static async getPopulate(_id){
        try {
            let existingCart = await cartRepository.getPopulate(_id);
            console.log('carrito',existingCart);
            if (!existingCart) {
                throw new Error('Carrito no encontrado' );
            }
            return existingCart;
        }catch(error){
        throw new Error('carrito no ecnotrado')
         }
    }
}
