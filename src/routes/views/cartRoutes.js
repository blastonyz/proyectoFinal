import express from 'express';
import { Router } from 'express';
import CartController from '../../controller/carts.controller.js';
import TicketsController from '../../services/tickets.controller.js';

const router = Router();



router.post('/carts', async (req,res) => {
//crea y añade a mongodb
const { productId, quantity } = req.body;
const user = req.user;
const cartId = user.cart;
console.log('requser',user);
try {
    const newCart = await CartController.createCart(productId, quantity,cartId);
    res.status(200).json(newCart);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});



router.delete('/carts/:cid/products/:pid', async (req,res) => {
    //eliminar el producto seleccionado del carrito
    const _id = req.params.cid;
    const pId = req.params.pid;
    try {
    const productDelete = await CartController.deleteProduct(_id,pId)    
    res.status(204).json({ message: 'producto quitado' ,productDelete});
    }catch (error) {
        res.status(500).json({ message: 'Error al borrar producto del carrito' });
    }
});

router.delete('/carts/:cid', async (req,res) => {
    //vaciamos carrito
    const {cid} = req.params;
    
    try {
       const deleteCart = await CartController.deleteCart({_id: cid});
       console.log('result',deleteCart);
        res.status(204).json(`carrito borrado ${cid}`);
    } catch (error) {
        console.error('error al borrar');
        res.status(400).json('error')
    }
   
});


router.put('/carts/:cid', async (req,res) => {
    //actualiza products con un array
    const _id = req.params.cid;
    const { products: newProducts } = req.body;
    
    
    try {
        let newCart = await CartController.updateCart(_id,newProducts);
        console.log(newCart);
        res.status(204).json(`carrito actualizado ${newCart}`);  
    } catch (error) {
        res.status(400).json("error al actualizar carrito");
        
    }
    
});

router.put('/carts/:cid/products/:pid', async (req,res) => {
    //actualiza solo cantidad
    const _id = req.params.cid;
    const pId = req.params.pid;
    const {newQuantity} = req.body;
    try {
            let existingCart = await CartController.updateQuantity(_id,pId,newQuantity);
           
             if (!existingCart) {
             return res.status(404).json({ message: 'Carrito no encontrado' });
             } 
             res.status(204).json({ message: 'cantidad actualizada' ,existingCart});
    }catch (error) {
        console.error('error al actualizar cantidad');
        res.status(500).json('error')
    }
   
});



router.get('/carts/:cid', async (req,res) => {

const _id = req.params.cid;
 const cartDb = await CartController.getPopulate(_id);
 if(!cartDb){
    return res.status(404).json({message: 'carrito no encontrado'})
 }
  console.log(cartDb);
  const result = cartDb.products.map(prod =>{return { id:prod.prodId?._id, title:prod.prodId?.title, description: prod.prodId?.description, price:prod.prodId?.price, category: prod.prodId?.category, code: prod.prodId?.code, stock: prod.prodId?.stock, statusP: prod.prodId?.statusP, quantity: prod.prodId?.quantity }})
 res.render('cart' , { title: 'cart',cartDb: result});
});

router.get('/:cid/purchase', async (req,res) =>{
    const cartId = req.params.cid;
    const email = req.user.email ;
    const final = await TicketsController.Purchase(cartId,email);
    res.status(201).json(final);
})


export default router;

