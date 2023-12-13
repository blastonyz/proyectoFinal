import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import UserModel from '../models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';


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
        return done(new Error( 'Todos los campos son requeridos'));
    }
    const user = await UserModel.findOne({email});
    if (user){
        return done(new Error(`Ya existe un usuario con ${email} registrado`))
    }
    const newUser = await UserModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: email === 'adminCoder@coder.com' && password === 'adminCod3e123' ? 'admin' : 'user'
    });
    done(null,newUser);
}))

passport.use('login', new LocalStrategy({usernameField: 'email'},async (email, password, done) => {
        const user = await UserModel.findOne({email});
        if(!user){
            return done(new Error('Correor o contraseña invalidos'))
        }
        const isNotValidPassword = !isValidPassword(password,user);
        if(isNotValidPassword){
            return done(new Error('Correo o Contraseña invalidos'));
        }
        done(null, user);
}));
const githubOpts = {
    clientID: 'Iv1.6f5ab4fc06090141',
    clientSecret: 'efd67deb72fb66c45de06fa56dacb9f0b2d64385',
    callbackURL: 'http://localhost:8080/api/sessions/github/callback'
}
passport.use('github', new GithubStrategy(githubOpts, async(accestoken, refreshToken, profile, done) =>{
    const email = profile._json.email;
    let user = await UserModel.findOne({ email });
    if(user){
        return done(mull, user);
    }
    user = {
        first_name: profile._json.first_name,
        last_name:'' ,
        email,
        age: 20,
        password: ''
    }
    const newUser = await UserModel.create(user);
    done(null, newUser);
}))

    passport.serializeUser((user,done) =>{
        done(null, user._id)
    });

    passport.deserializeUser(async (uid, done) =>{
        const user = await UserModel.findById(uid);
        done(null, user);
    })
}