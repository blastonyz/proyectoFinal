import { Router } from "express";
import passport from 'passport';
import { createHash } from "../../utils.js";
import UsersController from "../../controller/users.controller.js";



const router = Router();

router.post('/sessions/login',passport.authenticate('login', {failureRedirect: '/login'}), async (req,res) => {
    if(!req.user){
        
        return res.redirect('/login')
    }
    res.status(302).redirect('/api/productsdb');
});

router.post('/sessions/register',passport.authenticate('register', {failureRedirect: '/register'}), async (req,res) => { 
    res.redirect('/login')
});

router.get('/sessions/github',passport.authenticate('github' , {scope: ['user:email']}));

router.get('/sessions/github/callback', passport.authenticate('github', {failureredirect: '/login'}), (req,res) =>{
    console.log(req.user);
    res.redirect('/api/productsdb');
});
router.post('/sessions/recovery-password',async (req,res) =>{
    const {body: {email, password}} = req;
    if(!email || !password){
        return res.render('error', {messageError: 'Todos los campos son requeridos'});
    }
    const user = await UsersController.findByEmail({email});
    user.password = createHash(password);
    await UsersController.updateUser({email}, user);
    res.redirect('/login');
})
router.get('/sessions/logout', (req,res) => {
    req.session.destroy((error) =>{
        if(error){
            return res.render('error', {messageError: error.message})
        }
        res.redirect('/login');
    })
})
export default router;  

/*router.post('/sessions/login',passport.authenticate('login', {failureRedirect: '/login'}), async (req,res) => {
    if(!req.user){
        
        return res.redirect('/login')
    }
    res.status(302).redirect('/api/productsdb');
});

router.post('/sessions/register',passport.authenticate('register', {failureRedirect: '/register'}), async (req,res) => { 
    res.redirect('/login')
});

router.get('/sessions/github',passport.authenticate('github' , {scope: ['user:email']}));

router.get('/sessions/github/callback', passport.authenticate('github', {failureredirect: '/login'}), (req,res) =>{
    console.log(req.user);
    res.redirect('/api/productsdb');
});
*/