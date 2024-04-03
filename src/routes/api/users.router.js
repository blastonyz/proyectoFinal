import { Router } from 'express';
import UsersController from '../../controller/users.controller.js';
import uploader from '../../utils/uploader.js';
import UsersDTO from '../../dto/users.dto.js';
import UserService from '../../services/users.service.js';

const router = Router();
router.get('/users', async (req,res)=>{
    const allUsers = await UsersController.get();
    const allUsersDTO = allUsers.map((user) => new UsersDTO(user))
    res.status(200).json(allUsersDTO);
})

router.put('/users/premium/:uid', async (req,res)=>{
    const {uid} = req.params;
    const changingRole = await UserService.roleVerify(uid)
    res.status(200).json(changingRole)             
});

router.post('/users/:uid/documents',uploader,async (req,res) =>{
    try{
    const {uid} = req.params;
         const uploadedFiles = req.files;
         console.log('files:  ',uploadedFiles)
         const upedDocuments = await UserService.uploadDocuments(uid,uploadedFiles)
    res.status(200).json(upedDocuments);
      
    }catch(error){
        console.error('Error en la ruta POST /users/:uid/documents:', error);
        res.status(500).json('Error interno del servidor');
    }
})

router.get('/users/:uid/documents', (req,res) =>{
    const uid = req.user._id.toString()
    console.log(uid);
    res.render('documents',{uid, title: 'Carga de documentos'})
})

router.delete('/users', async (req,res)=>{
    const deleteResults = await UserService.deleteOldUsers();
    res.status(200).json(deleteResults);
});



export default router;
