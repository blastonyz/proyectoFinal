import express from 'express'
import { Router } from 'express';
const router = Router();
import productManager from '../productManager.js';
import {v4 as uuidV4} from 'uuid';
import fs from 'fs'
import {pid} from 'process';
const path = './productos.json';


router.get('/products',async (req,res) => {
    const {query} = req;
    const {limit} = query;
    const product = await productManager.getProducts();
    if(!limit){   
     res.json(product);}else{
     const filtrated = product.filter((prod) => prod.id <=limit);
     console.log("filtrao")
     return res.status(201).json(filtrated);    
     }   
 });
 
 router.get('/products/:pId',async (req,res) => {
    const prodId = req.params.pId;
    const search =  await productManager.getProductsbyId(prodId);
    return res.status(200).json(search);
});
//agregar producto
router.post('/product/add', async (req,res) =>{
    const product = await productManager.getProducts();
    const {body} = req;
    
    if (!body.title || !body.description || !body.price || !body.category || !body.code || !body.stock || !body.statusP) {
        return console.warn("Todos los campos son requeridos");                          
        }else{          
            const  newProduct = {
                id:uuidV4(),
                ...body,
                 };   
            await product.push(newProduct);
              const content = JSON.stringify(product,null,'\t')
            try {
             await fs.promises.writeFile(path,content,'utf-8');
                 console.log('producto agregado');
               } catch (error) {
              console.log(`Ha ocurrido un error: ${error.message}`) 
               }
     res.status(201).json(newProduct);
            }

})

router.put('/product/update/:pId', async (req,res) =>{
    const product = await productManager.getProducts();
    const {body} = req;
    const index = product.findIndex((e)=> e.id ===req.params.pId);
    const originalProduct = product[index];
    if(index !== -1){
        const updateProduct = {
            ...originalProduct,
      title: body.title || originalProduct.title,
      description: body.description || originalProduct.description,
      price: body.price || originalProduct.price,
      category: body.category || originalProduct.category,
      code: body.code || originalProduct.code,
      stock: body.stock || originalProduct.stock,
      statusP: body.statusP || originalProduct.statusP,
      thumbnail: body.thumbnail || originalProduct.thumbnail,
        }
        product[index] = updateProduct;
        const content = JSON.stringify(product,null,'\t')
      try {
       await fs.promises.writeFile(path,content,'utf-8');
           console.log('producto actualizado');
         } catch (error) {
        console.log(`Ha ocurrido un error: ${error.message}`) 
         }
        res.status(201).json(updateProduct);
    }else{
        res.status(404).json(error.message);
    }

})

router.delete('/product/delete/:pId', async (req,res) =>{
    const prodId = req.params.pId;
    const deleted = productManager.deleteProduct(prodId)
    return res.status(200).json(deleted);

})
export default router;

/*const express = require('express');
const {Router} = require('express')
const router = Router();
const productManager  = require('../productManager');
const { v4: uuidV4} = require('uuid');
const fs = require('fs');
const { pid } = require('process');*/