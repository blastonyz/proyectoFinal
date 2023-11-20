import {Router} from 'express';
import ProductsManager from '../../dao/ProductManagerMdb.js';

const router = Router();


router.get('/productsdb', async(req,res) => {
   const products = await ProductsManager.get();
   console.log(products);
   res.render('productsdb' ,{products: products.map(prod => prod.toJSON()),title: 'integracion de DB'});
})

export default router;