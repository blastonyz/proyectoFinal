import {Router} from "express";
import sessionRouter from  '../api/session.router.js';


const router= Router();

router.get('/login', (req,res) =>{
     const error = req.query.error; 
    res.render('login', {title:"Inicio de Sesion",error})
});

router.get('/register', (req,res) =>{
     const error = req.query.error; 
    res.render('register', {title:"Registro",error})
});

router.get('/recovery-password', (req,res) =>{
     const error = req.query.error; 
    res.render('recovery-pass', {title:"Recuperar Contraseña",error})
});
export default router