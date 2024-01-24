import express from 'express';
import { authRolesMiddleware } from '../utils.js';

const router = express.Router();
router.get('/realtimeproducts', authRolesMiddleware(['admin']),(req,res) =>{
    res.render('realTimeProducts', { title:'Real Time products'})
})

export default router;