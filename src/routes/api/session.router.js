import { Router } from "express";
import passport from 'passport';


/*
import UserModel from '../../models/users.model.js';

import { createHash, isValidPassword } from "../../utils.js";*/

const router = Router();

router.post('/sessions/login',passport.authenticate('login', {failureRedirect: '/login'}), async (req,res) => {
    if(!req.user){
        
        return res.redirect('/login')
    }
    /*
    const { body: {email, password}} = req;
    if(!email || !password){
        return res.render('error', {title:"Autenticacion fallida",messageError: 'Todos los campos son requeridos'});
    }

    const user = await UserModel.findOne({ email });
    if(!user){
        return res.render('error', {title:"Autenticacion fallida",messageError: 'Usuario o Contraseña invalidos'});
    }
    if(user.password !== password){
        return res.render('error', {title:"Autenticacion fallida",messageError: 'Usuario o Contraseña invalidos'});
    }
    const {
        first_name,
        last_name,
        age,
        role
    } = user;
    req.session.user = {
        first_name,
        last_name,
        email,
        age,
        role
    };*/
    console.log(req.user);
    res.status(302).redirect('/productsdb');
   
    
});

router.post('/sessions/register',passport.authenticate('register', {failureRedirect: '/register'}), async (req,res) => {
    /*
    const{
        body: {
            first_name,
            last_name,
            email,
            age,
            password,
        },
    } = req;
  if(!first_name || !last_name || !email ||  !age || !password){
    return res.status(400).json({message: 'Todos los campos son requeridos'});
    }  
    const user = await UserModel.create({
        first_name,
        last_name,
        email,
        age,
        password,
        role: email === 'adminCoder@coder.com' && password === 'adminCod3e123' ? 'admin' : 'user'
    });*/
    
    res.redirect('/login')
});

router.get('/sessions/github',passport.authenticate('github' , {scope: ['user:email']}));

router.get('/sessions/github/callback', passport.authenticate('github', {failureredirect: '/login'}), (req,res) =>{
    console.log(req.user);
    res.redirect('/api/productsdb');
});
export default router;