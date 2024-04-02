import express from 'express';
import UsersController from '../../controller/users.controller.js';
import uploader from '../../utils/uploader.js';
import UsersDTO from '../../dto/users.dto.js';
import EmailServices from '../../services/mail.services.js';


const router = express.Router();
router.get('/users', async (req,res)=>{
    const allUsers = await UsersController.get();
    const allUsersDTO = allUsers.map((user) => new UsersDTO(user))
    res.status(200).json(allUsersDTO);
})

router.put('/users/premium/:uid', async (req,res)=>{
    const {uid} = req.params;
    
    const oldUser =  await UsersController.findById(uid);
    if (!oldUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    const totalNames = oldUser.documents.map((e) => e.name).filter(name => name !== undefined);
    console.log('documents',totalNames);
    const requiredDocuments = ['identificacion.txt', 'comprobante-domicilio.txt', 'comprobante-estado-de-cuenta.txt'];
    
    let completeDocuments = true;
    for (const docName of requiredDocuments) {
        if (!totalNames.includes(docName)) {
            completeDocuments = false;
            break;
        }
    }
    console.log('allRequiredDocumentsPresent', completeDocuments);
    const user = {                        
               role: completeDocuments ? 'premium' : oldUser.role
               }
    
   const changeRole = await  UsersController.findAndUpdate(uid,user);
  
   res.status(200).json(changeRole)             
});

router.post('/users/:uid/documents',uploader,async (req,res) =>{
    try{
    const {uid} = req.params;
    console.log(uid)
    const oldUser =  await UsersController.findById(uid);
    console.log("Old User:", oldUser);
    const uploadedFiles = req.files;
    if (!uploadedFiles) {
        return res.status(400).send('No se han recibido archivos');
    }
        const newDocuments = [];
        if (!uploadedFiles || Object.keys(uploadedFiles).length === 0) {
            return res.status(400).send('No se han recibido archivos');
        }

        for (const fieldName in uploadedFiles) {
           
                const files = uploadedFiles[fieldName];
                console.log(`Fieldname: ${fieldName}, Files:`, files);
                    files.forEach(file => {
                        newDocuments.push({name: file.originalname},{links: file.path})
                    });
             
        }
        const data = {
            first_name: oldUser.first_name,                
            last_name: oldUser.last_name,
            email: oldUser.email,
            age: oldUser.age,
            password: oldUser.password,
            role: oldUser.role,
            $push: { 
                documents: { 
                    $each: newDocuments 
                }
            },
            last_connection: oldUser.last_connection,
            cart: oldUser.cart
        }
        console.log('data',data);
        const upDocuments = await UsersController.findAndUpdate( uid,data);
 

        // Los archivos se han subido correctamente, puedes hacer algo aquí
        res.status(200).json(upDocuments);
      
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
    const allUsers = await UsersController.get();
    console.log('users', allUsers);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    console.log('2dias', twoDaysAgo);
    const promises = allUsers.map(async user => {
        if (user.role !== 'admin') {
          
            if (user.last_connection && user.last_connection.getTime()   >= twoDaysAgo) {
                console.log(`Usuario ${user.email} dentro del plazo.`);
                console.log('ultima conexion', user.last_connection);
                return null
            } else {
                console.log(`Usuario ${user.email} a eliminar.`);
                console.log('ultima conexion', user.last_connection);
                const emailService = EmailServices.getInstance();
                await emailService.sendEmail(
                `${user.email}`,
                'Aviso de Iron Tools',
                `<h2>${user.first_name} ${user.last_name} tu cuenta de Iron Tools fue eliminada por inactividad </h2>`
             );
                return await UsersController.findAndDelete(user.email);
            }
        } else {
            console.log('Usuario administrador.');
            return null
        }
    });
 
    const results = await Promise.all(promises);
    console.log('result',results);
    res.status(200).json(results);
});



export default router;
