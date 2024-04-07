import {Router} from "express";


const router= Router();

router.get('/productsdb', (req,res) =>{
     const error = req.query.error; 
     if(!req.user){
        req.logger.warning('Usuario sin autenticar');
        return res.redirect('/login')
    }
    res.render('productsdb', {title:"Productos",error})
});

export default router;