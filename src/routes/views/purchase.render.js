import {Router} from "express";


const router= Router();

router.get('/purchase/:cid', (req,res) =>{
    const _id = req.params.cid
    res.render('purchase', {title:"Detalle de Compra",cid: _id})
});

export default router;