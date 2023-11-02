import express from 'express';

const router = express.Router();
router.get('/realtimeproducts',(req,res) =>{
    res.render('realTimeProducts', { title:'Real Time products'})
})

export default router;