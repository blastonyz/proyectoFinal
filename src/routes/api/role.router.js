import express from 'express';
import { authRolesMiddleware } from '../../utils.js';
import UsersController from '../../controller/users.controller.js';

const router = express.Router();

router.put('/users/premium/:uid', async (req,res)=>{
    const {uid} = req.params;
    console.log(uid)
    const oldUser =  await UsersController.findById(uid);
    if (!oldUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    console.log('olduser',oldUser)
    const email = oldUser.email;
    console.log('email', email);
    

    const user = {
                            
                    last_name: oldUser.last_name,
                    email: oldUser.email,
                    age: oldUser.age,
                    password: oldUser.password,
                    role: 'user'? 'premium':'user',
                    cart: oldUser.cart
                }
    
   const changeRole =  UsersController.updateUser({email},user);
   res.status(200).json(changeRole)             
});

export default router;