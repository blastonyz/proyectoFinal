import { Router } from "express";
import passport from 'passport';
import { createHash, isValidPassword } from "../../utils.js";
import UsersController from "../../controller/users.controller.js";
import { logger } from "../../utils/logger.js";
import EmailServices from '../../services/mail.services.js';
import { generateToken, verifyToken } from "../../utils.js";


const router = Router();

router.post('/sessions/login',passport.authenticate('login', {failureRedirect: '/login'}), async (req,res) => {
    if(!req.user){
        logger.warning('Usuario sin autenticar');
        return res.redirect('/login')
    }
     await UsersController.findAndUpdate(
        { _id: req.user._id }, 
        { last_connection: new Date() },   
    );
    //res.status(200).send(req.user)
    res.status(302).redirect('/api/productsdb');
});

router.post('/sessions/register',passport.authenticate('register', {failureRedirect: '/register'}), async (req,res) => { 
    res.status(200).redirect('/login');
});

router.get('/sessions/github',passport.authenticate('github' , {scope: ['user:email']}));

router.get('/sessions/github/callback', passport.authenticate('github', {failureredirect: '/login'}), (req,res) =>{
    req.logger.info('suario github',req.user);
    res.redirect('/api/productsdb');
});

router.post('/sessions/recovery-password',async (req,res) =>{
    const { body: { email, password } } = req;
    const {token} = req.query;
    console.log('Request Query:', req.query);
    
    try{
         if(!email || !password){
        return res.render('error', {messageError: 'Todos los campos son requeridos'});
         }
   
    const decodedToken = await verifyToken(token);
    console.log('decoded', decodedToken)
        if(!decodedToken){
            return res.render('error', {messageError: 'tiempo expirado'});
        }
            
                const user = await UsersController.findByEmail({email});
                
                if(!decodedToken){
                    return res.render('error', { messageError: 'Token inválido' });
                }
                const isSamePassword = isValidPassword(password, user);

                if (isSamePassword) {
                    return res.render('error', { messageError: 'La nueva contraseña no puede ser igual a la anterior' });
                }
        
                user.password = createHash(password);
                await UsersController.updateUser({email}, user);
                res.status(200).redirect('/login');
            }catch(error){
              console.error('error token', error)
              res.render('error', {title:TokenExpiredError}, error)          
           
        }
        
});

router.post('/sessions/recovery-link', async (req,res) =>{
    const {body: {email}} = req;
   
    console.log('email del usuario', email);
    const validEmail = await UsersController.findByEmail()
    if(!email){
        return res.render('error', {messageError: 'Email requerido'});
    }
      if(!validEmail){
        return res.render('error', {messageError: 'No encontramos usuarios registrados con ese email'});
      }
      const token = generateToken();
      console.log('token generado',token)
      const recoveryLink = `http://localhost:8080/recovery-password?token=${token}`;  
      const emailService = EmailServices.getInstance();
      const result = await emailService.sendEmail(
      `${email}`,
      'Enlace de recuperacion de password',
      `<h2>Ingresa al siguiente enlace para restablecer tu contraseña:</h2> <a href=${recoveryLink}>Link</a>`
   );
   res.status(200).json(result);
})
/*
router.get('/sessions/register',passport.authenticate('register', {failureRedirect: '/register'}), async (req,res) => { 
    res.redirect('/login');
});

router.get('/sessions/login',passport.authenticate('login', {failureRedirect: '/login'}), async (req,res) => { 
    res.render('error',{title: "error", messageError: Error});
});*/

router.get('/sessions/logout', (req,res) => {
    req.session.destroy((error) =>{
        if(error){
            return res.render('error', {messageError: error.message})
        }
        res.status(200).redirect('/login');
    })
});


export default router;  

