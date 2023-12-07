import {Router} from "express";

const router= Router();

router.get('/login', (req,res) =>{
    res.render('login', {title:"Inicio de Sesion"})
});

router.get('/register', (req,res) =>{
    res.render('register', {title:"Registro"})
});

export default router