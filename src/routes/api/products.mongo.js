import {Router} from 'express';
import ProductController from '../../controller/products.controller.js';


const router = Router();

router.get('/products/crud', async (req,res) => {
    const products = await ProductController.get();
    res.status(200).json(products);
});

router.get('/products/crud/:sid', async (req,res) => {
    const {sid} = req.params;
    const products = await ProductController.getById(sid);
    res.status(200).json(products);
});

router.post('/products/crud', async (req,res) => {
    const {body} = req;
    const products = await ProductController.create(body);
    res.status(201).json(products);
});

router.put('/products/crud/:sid', async (req,res) => {
    const {sid} = req.params;
    const {body} = req;
    const product = await ProductController.updateById(sid,body);
    res.status(204).send(product);
});

router.delete('/products/crud/:sid', async (req,res) => {
    const {sid} = req.params;

    product = await ProductController.deleteById(sid);
    res.status(204).send(product);
});

export default router;
