import { Router } from "express";
import { authRolesMiddleware } from "../../utils.js";

const router = Router();

router.get('/carts/:cid',authRolesMiddleware(['user','premium']), (req,res) => {
    const _id = req.params.cid
    res.render('cart',{title:"Carrito de Compras",cid: _id});
});
export default router;