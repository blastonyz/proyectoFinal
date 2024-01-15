import express from 'express';
import { Router } from 'express';
//import CartModel from '../../models/carts.models.js'
import CartController from '../../controller/carts.controller.js'

const router = Router();



router.post('/carts', async (req,res) => {
//crea y añade a mongodb
    const { productId, quantity } = req.body;
    const user = req.user;
    const cartId = user.cart;
    console.log('cartID',cartId);
    console.log('requser',user);
    try {
    
          let existingCart = await CartController.GetById(cartId);

          console.log('carrito',existingCart);  
          
          if(!existingCart){   
          res.status(404).json({ message: 'carrito o usuario no encontrados' });
          }else{
            let existProductInd =  existingCart.products.findIndex( (p) => p.prodId && p.prodId.toString()   === productId );
            console.log('indice',existProductInd);
              if(existProductInd < 0){
               const added = await CartController.update({
                    _id: existingCart._id,},{
                   $push:{products: {prodId: productId,quantity:quantity}}
                    }
                   );
                   res.status(201).json({ message: 'carrito actualizado' ,added});
              }else{
              existingCart.products[existProductInd] = {prodId: existingCart.products[existProductInd].prodId, quantity: existingCart.products[existProductInd].quantity + quantity };
              
              await CartController.update({
                _id: existingCart._id,},
               
               {products: existingCart.products }
                
               );
               res.status(201).json({ message: 'cantidad actualizada' ,existingCart})
              }
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
    
        }
    
});



router.delete('/carts/:cid/products/:pid', async (req,res) => {
    //eliminar el producto seleccionado del carrito
    const cId = req.params.cid;
    const pId = req.params.pid;
    try {
    let existingCart = await CartController.GetById({_id: cId});
    console.log('carrito',existingCart);
    let existProductInd = existingCart.products.findIndex( (p) => p.prodId+"" === pId );
    console.log('indice',existProductInd);
    const data = existingCart.products.splice(existProductInd,1);
    console.log('mutado',existingCart);
    await CartController.update({
        _id: existingCart._id,},{
       $set:{products: existingCart.products}
        }
       );
       console.log('quitado de la lista',data);
       //no responde por postman
    res.status(204).json({ message: 'producto quitado' ,existingCart});
    }catch (error) {
        res.status(500).json({ message: 'Error al borrar producto al carrito' });
    }
});

router.delete('/carts/:cid', async (req,res) => {
    //eliminar el carrito completo
    const {cId} = req.params.cid;
    
    try {
       const deleteCart = await CartController.delete({_id: cId});
       console.log('result',deleteCart);
        res.status(204).json(`carrito borrado ${cId}`);
    } catch (error) {
        console.error('error al borrar');
        res.status(400).json('error')
    }
   
});


router.put('/carts/:cid', async (req,res) => {
    //actualiza products con un array
    const cId = req.params.cid;
    const { newProducts} = req.body;
    let existingCart = await CartController.GetById({_id: cId});
    console.log(newProducts)
    if(!existingCart){
        res.status(400).json("carrito no encontrado");
    }
    const newCart = await CartController.update({
        _id: existingCart._id,},{
       $set:{products: newProducts}
        }
       );
    res.status(204).json(`carrito actualizado ${newCart}`);   
});

router.put('/carts/:cid/products/:pid', async (req,res) => {
    //actualiza solo cantidad
    const cId = req.params.cid;
    const pId = req.params.pid;
    const {newQuantity} = req.body;
    try {
    let existingCart = await CartController.GetById({_id: cId});
    console.log('carrito',existingCart);
    let existProductInd = existingCart.products.findIndex( (p) => p.prodId+"" === pId );
    console.log('indice',existProductInd);

    existingCart.products[existProductInd] = {prodId: existingCart.products[existProductInd].prodId, quantity: newQuantity }
    console.log('mutado',existingCart);
    await CartController.update({
        _id: existingCart._id,},{
       $set:{products: existingCart.products}
        }
       );
      
    res.status(204).json({ message: 'cantidad actualizada' ,existingCart});
    }catch (error) {
        console.error('error al actualizar cantidad');
        res.status(500).json('error')
    }
   
});



router.get('/carts/:cid', async (req,res) => {

const cId = req.params.cid;
 const cartDb = await CartController.GetById({_id: cId}).populate('products.prodId');
 if(!cartDb){
    return res.status(404).json({message: 'carrito no encontrado'})
 }
  console.log(cartDb);
  const result = cartDb.products.map(prod =>{return { id:prod.prodId?._id, title:prod.prodId?.title, description: prod.prodId?.description, price:prod.prodId?.price, category: prod.prodId?.category, code: prod.prodId?.code, stock: prod.prodId?.stock, statusP: prod.prodId?.statusP, quantity: prod.prodId?.quantity }})
 res.render('cart' , { title: 'cart',cartDb: result});
});




export default router;
