import express from 'express';
import { Router } from 'express';
import CartModel from '../../models/carts.models.js'


const router = Router();



router.post('/cart', async (req,res) => {
//crea y añade a mongodb
try {
    const { productId, quantity } = req.body;
    
        // creamos un carrito
      let cart = await CartModel.create({ products: [{productId},{quantity}] });

    /*
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(product => product.prodId === productId);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        cart.products[existingProductIndex].quantity += parseInt(quantity);
    } else {
        // Si el producto no está en el carrito, lo agrega
        cart.products.push({ prodId: productId, quantity: parseInt(quantity) });
    }*/

    res.status(201).json({ message: 'Producto agregado al carrito exitosamente' },cart);
    } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
    }
});



router.delete('/carts/:cid/products/:pid', async(req,res) =>{
    //eliminar el producto seleccionado del carrito
});

router.delete('/carts/:cid', async(req,res) =>{
    //eliminar el carrito completo
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
