import {Router} from 'express';
import MessageModel from '../../models/message.model.js'
import {authRolesMiddleware } from '../../utils.js'

const router = Router();


router.get('/chat',authRolesMiddleware(['user']) ,async(req,res) => {
    const messages = await MessageModel.find({});
   res.render('chat' ,{messages,title: 'chat'});
});

export default router;