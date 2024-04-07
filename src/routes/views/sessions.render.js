import {Router} from "express";
import { verifyToken } from "../../utils.js";


const router= Router();

router.get('/login', (req,res) =>{
   
    res.render('login', {title:"Inicio de Sesion"})
});

router.get('/register', (req,res) =>{
     const error = req.query.error; 
    res.render('register', {title:"Registro",error})
});

router.get('/recovery-link', (req,res) =>{
   res.render('recovery-link', {title:"Recuperar Contraseña"})
});

router.get('/recovery-password', async (req, res) => {
    const { error, token } = req.query;
        
    try{
        const decodedToken = await verifyToken(token);    
           if(!decodedToken){
               return res.render('error', {messageError: 'token expirado o invalido'} )}
                   
    }catch(error){
     return res.render('error', {messageError: 'token expirado o invalido'} )
    }

  res.render('recovery-pass', { title: 'Recuperar Contraseña', error, token });    
});
        

export default router