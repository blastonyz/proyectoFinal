import express from 'express'
import { Router } from 'express';
const router = Router();
import {v4 as uuidV4} from 'uuid';
import fs from 'fs';

const path = './carts.json';
const carts = [];

router.post('/cart', async (req,res) => {

        const newCart = {
            id: uuidV4(),
            products:[],
        }
        console.log(newCart);
        carts.push(newCart);
        const content = JSON.stringify(carts, null, '\t'); 
        try {
            await fs.promises.writeFile(path, content, 'utf-8');
            return res.status(201).json(newCart);
        } 

        catch (error) {
            console.log(`Ha ocurrido un error: ${error.message}`);
            return res.status(404).json({msg:error.message});
        }
        

});

router.post('/:cId/product/:pId', async (req,res) => {
        const {cId,pId} = req.params;

        const newProduct = {
            id: pId,
            quantity:1,
        }
        const cartIndex = carts.findIndex((cart) => cart.id === cId);

        if (cartIndex !== -1) {


            const cart = carts[cartIndex];
             const existingProduct = cart.products.find((product) => product.id === pId);

              if (existingProduct) {
                      existingProduct.quantity++;
                } else {
                    cart.products.push(newProduct);
                }

                const content = JSON.stringify(carts, null, '\t');
                try {
                    fs.promises.writeFile(path, content, 'utf-8');
                    } catch (error) {
                    console.log(`Ha ocurrido un error: ${error.message}`);
                    res.status(500).json({ error: 'Error writing to file' });
                    return;
                      }

                res.status(201).json(cart);
            } else {
            res.status(404).json({ error: 'Cart not found' });
            }
});

router.get('/:cId',async (req,res)=>{
    const {cId } = req.params;



    try {
        const contetJson = await fs.promises.readFile(path,'utf-8')
        const content = JSON.parse(contetJson);
        const cartSearch = content.find((c)=> c.id === cId )
              if(cartSearch){
                              const list = cartSearch.products;
                              console.log(list);
                            return res.status(200).json(list);   
              }    
        } catch (error) {
        console.log(`Ha ocurrido un error: ${error.message}`);
        return;
          }

})
export default router;

/*const express = require('express');
const {Router} = require('express')
const router = Router();
const { v4: uuidV4} = require('uuid');
const fs = require('fs');*/