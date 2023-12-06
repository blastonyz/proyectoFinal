import express from 'express';
import { Router } from 'express';
import CartModel from '../../models/carts.models.js'


const router = Router();



router.post('/carts', async (req,res) => {
//crea y añade a mongodb
    const { productId, quantity } = req.body;
    try {
    
          let existingCart = await CartModel.findOne();
          console.log(existingCart);
          
          if(!existingCart){   
          let cart = await CartModel.create({ products: [{prodId: productId,quantity:quantity}] });
          res.status(201).json({ message: 'carrito creado exitosamente' ,cart});
          }else{
            let existProductInd =  existingCart.products.findIndex( (p) => p.prodId && p.prodId.toString()   === productId );
            console.log(existProductInd);
              if(existProductInd < 0){
               const added = await CartModel.updateOne({
                    _id: existingCart._id,},{
                   $push:{products: {prodId: productId,quantity:quantity}}
                    }
                   );
                   res.status(201).json({ message: 'carrito actualizado' ,added});
              }else{
              existingCart.products[existProductInd] = {prodId: existingCart.products[existProductInd].prodId, quantity: existingCart.products[existProductInd].quantity + quantity };
              
              await CartModel.updateOne({
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
    let existingCart = await CartModel.findById({_id: cId});
    console.log('carrito',existingCart);
    let existProductInd = existingCart.products.findIndex( (p) => p.prodId+"" === pId );
    console.log('indice',existProductInd);
    const data = existingCart.products.splice(existProductInd,1);
    console.log('mutado',existingCart);
    await CartModel.updateOne({
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
    const cId = req.params.cid;
    const { newProducts} = req.body;
    let existingCart = await CartModel.findById({_id: cId});
    console.log(newProducts)
    if(!existingCart){
        res.status(400).json("carrito no encontrado");
    }
    const newCart = await CartModel.updateOne({
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
    let existingCart = await CartModel.findById({_id: cId});
    console.log('carrito',existingCart);
    let existProductInd = existingCart.products.findIndex( (p) => p.prodId+"" === pId );
    console.log('indice',existProductInd);

    existingCart.products[existProductInd] = {prodId: existingCart.products[existProductInd].prodId, quantity: newQuantity }
    console.log('mutado',existingCart);
    await CartModel.updateOne({
        _id: existingCart._id,},{
       $set:{products: existingCart.products}
        }
       );
    //no se visualiza en postman la repsuesta  
    res.status(204).json({ message: 'cantidad actualizada' ,existingCart});
    }catch (error) {
        console.error('error al actualizar cantidad');
        res.status(500).json('error')
    }
   
});



router.get('/carts/:cid', async (req,res) => {
//muestra carrito por id,momentaneamente sin renderizar
const cId = req.params.cid;
 const cartDb = await CartModel.findById({_id: cId}).populate('products.prodId');
  console.log(cartDb);
  const result = cartDb.products.map(prod =>{return { id:prod.prodId?._id, title:prod.prodId?.title, description: prod.prodId?.description, price:prod.prodId?.price, category: prod.prodId?.category, code: prod.prodId?.code, stock: prod.prodId?.stock, statusP: prod.prodId?.statusP }})
 res.render('cart' , { title: 'cart',cartDb: result});
});




export default router;
