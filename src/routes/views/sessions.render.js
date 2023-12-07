import {Router} from "express";
import sessionRouter from  '../api/session.router.js'

const router= Router();

router.get('/login', (req,res) =>{
    res.render('login', {title:"Inicio de Sesion"})
});

router.get('/register', (req,res) =>{
    res.render('register', {title:"Registro"})
});

export default router