import express from 'express';
import { authRolesMiddleware } from '../utils.js';

const router = express.Router();
router.get('/realtimeproducts', authRolesMiddleware(['admin','premium']),(req,res) =>{
    const userId = req.user._id;
    const idUser = userId.toString();

    console.log('user', req.user);
    console.log('userPlano', idUser);
    res.render('realTimeProducts', { title:'Real Time products',idUser})
})

export default router;