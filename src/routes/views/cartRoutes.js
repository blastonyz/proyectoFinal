import express from 'express';
import { Router } from 'express';
import CartModel from '../../models/carts.models.js'


const router = Router();



router.post('/carts', async (req,res) => {
//crea y añade a mongodb
try {
    const { productId, quantity } = req.body;

      let existingCart = await CartModel.findOne();
      console.log(existingCart);
      
      if(!existingCart){   
      let cart = await CartModel.create({ products: [{prodId: productId,quantity:quantity}] });
      res.status(201).json({ message: 'carrito creado exitosamente' ,cart});
      }else{
        let existProduct = existingCart.products.find( (p) => p.prodId.toString() === productId );
        console.log(existProduct);
          if(!existProduct){
            await CartModel.updateOne({
                _id: existingCart._id,},{
               
               $push:{products: {prodId: productId,quantity:quantity}}
                }
               );
               res.status(201).json({ message: 'carrito actualizado' ,existingCart});
          }
          
          await CartModel.updateOne({
            _id: existingCart._id,},
           
           {products: {prodId: productId, quantity: existProduct.quantity += quantity} }
            
           );
           res.status(201).json({ message: 'cantidad actualizada' ,existProduct})
      }
  
    } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });

    }
});



router.delete('/carts/:cid/products/:pid', async (req,res) => {
    //eliminar el producto seleccionado del carrito
});

router.delete('/carts/:cid', async (req,res) => {
    //eliminar el carrito completo
    try {
        const cId = req.params.cid;
       const deleteCart = await CartModel.deleteOne({_id: cId});
       console.log('result',deleteCart);
        res.status(204).json(`carrito borrado ${cId}`);
    } catch (error) {
        console.error('error al borrar');
        res.status(400).json('error')
    }
   
});


router.put('/carts/:cid', async (req,res) => {
    //actualiza products con un array
});

router.put('/carts/:cid/products/:pid', async (req,res) => {
    //actualiza solo cantidad
});


router.get('/carts', async (req,res) => {
//muestra carrito por id
 const cartsDb = await CartModel.find();
 console.log(cartsDb)
 res.status(200).json(cartsDb); 
});




export default router;
