import { Router } from "express";
import { authRolesMiddleware } from "../../utils.js";
const router = Router();

router.get('/admin',authRolesMiddleware(['admin']),(req,res)=>{
    res.render('admin', {title:'Gestion de usuarios'})
});

export default router;