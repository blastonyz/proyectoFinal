import express from 'express';
import UsersController from '../../controller/users.controller.js';
import uploader from '../../utils/uploader.js';


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
        
        console.log("Uploaded Files:", uploadedFiles);
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


export default router;


/*  for (const fieldName in uploadedFiles) {
            if (Object.prototype.hasOwnProperty.call(uploadedFiles, fieldName))  {
                const files = uploadedFiles[fieldName];
                console.log(`Fieldname: ${fieldName}, Files:`, files);

                // Verificar si files es un array
                if (Array.isArray(files)) {
                    // Iterar sobre los archivos
                    files.forEach(file => {
                        newDocuments.push({name: file.originalname},{links: file.path})
                    });
                } else {
                    console.error('No se ha recibido un array de archivos para el campo:', fieldName);
                }
            }
        }*/