import { Router } from "express";
import UserModel from '../../models/users.model.js';

const router = Router();

router.post('/sessions/login', async (req,res) => {
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
    };
    res.status(302).redirect('/api/productsdb');
   
    
});

router.post('/sessions/register', async (req,res) => {
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
    });
    
    res.redirect('/api/login')
});

/*
router.get('/sessions/current', (req,res) => {
    if(!req.session.user){
        return res.status(401).json({message: 'no estas autenticado'});
    }
    res.redirect('/api/prouctsdb');
    });*/

export default router;