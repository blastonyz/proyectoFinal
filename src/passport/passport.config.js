import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import UsersController from '../controller/users.controller.js';
import CartDao from '../dao/carts.dao.js';
import { createHash, isValidPassword } from '../utils.js';
import { CustomErrors } from '../utils/custom.errors.js';
import { generatorLoginError, generatorUserError, generatorRegisterError } from '../utils/causeMessage.errors.js';
import listErrors from '../utils/list.errors.js';
import { logger } from '../utils/logger.js';

export const init = () => {
const registerOpts = {
    usernameField: 'email',
    passReqToCallback: true,
};

passport.use('register', new LocalStrategy(registerOpts,async (req, email, password, done) =>{
    const {
        body:{
            first_name,
            last_name,
            age
            
        } 
    }= req;
    if(!first_name || !last_name || !email ||  !age || !password){
      try {
        logger.warning('Campos Incompletos');  
        throw CustomErrors.create({
                name:'invalid users data',
                cause: generatorUserError({ 
                    first_name,
                    last_name,
                    age,
                    email,}),     
               
               message: 'Error al intentar registrarse',
               code: listErrors.BAD_REQUEST_ERROR,  
                  
                })
          
         
      } catch (error) {
        return done(error);
      }  
     
    }
    const user = await UsersController.findByEmail({email});
    if (user){
        try {
            throw CustomErrors.create({
                name:'email allready register',
                cause: generatorRegisterError({ 
                    first_name,
                    last_name,
                    age,
                    email,}),     
               
               message: 'Usuario ya registrado',
               code: listErrors.BAD_REQUEST_ERROR,     
                });

        } catch (error) {
            return done(error);
        }
        
    }

    const newCart = await CartDao.create({products:[]});
    const cartID = newCart._id.toString();
    logger.info('cartID',cartID);
    const newUser = await UsersController.createUser({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role:email === 'adminCoder@coder.com' && password ==='adminCod3e123'?'admin':'user',
        cart: cartID
    });
   logger.info('newUser',newUser);
    done(null,newUser);
}))

passport.use('login', new LocalStrategy({usernameField: 'email'},async (email, password, done) => {
        const user = await UsersController.findByEmail({email});
        if(!user){
            try {
            req.logger.warning('Usuario no registrado');    
            throw CustomErrors.create({
                    name:'invalid users data',
                    cause: generatorLoginError({ 
                        email,
                        password
                    }),     
                   
                   message: 'Error al intentar ingresar',
                   code: listErrors.BAD_REQUEST_ERROR,     
                    })
            } catch (error) {
                return done(error)
            }
            
        }
        const isNotValidPassword = !isValidPassword(password,user);
        if(isNotValidPassword){
            return done(new Error(' aca Correo o Contraseña invalidos'));
        }
        logger.info('user', user);
        done(null, user);
}));

const githubOpts = {
    clientID: 'Iv1.6f5ab4fc06090141',
    clientSecret: '2f643dad7c1c3cf06e255a85805a55687657ad06',
    callbackURL: 'http://localhost:8080/sessions/github/callback',
    
};

passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshToken, profile, done) => {
    const email = profile._json.email;
    let user = await UsersController.findByEmail({ email });
    logger.info('usuario github',user);
    if(user){
        return done(null, user);
    }
    const newCart = await CartDao.create({products:[]});
    const cartID = newCart._id.toString();
    user = {
        first_name: profile._json.name,
        last_name:'' ,
        email,
        age: 20,
        password: '',
        cart: cartID
    }
    const newUser = await UsersController.createUser(user);
    done(null, newUser);
}));

    passport.serializeUser((user,done) =>{
        if (user) {
            done(null, user._id);
        } else {
            done(new Error('User is null or undefined'));
        }
    
    });

    passport.deserializeUser(async (uid, done) =>{
        const user = await UsersController.findById(uid);
        done(null, user);
    })
}