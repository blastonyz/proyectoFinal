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
    clientSecret: '2f643dad7c1c3cf06e255a85805a55687657ad06',
    callbackURL: 'http://localhost:8080/sessions/github/callback',
    
};

passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshToken, profile, done) => {
    console.log(profile);
    const email = profile._json.email;
    console.log(email);
    let user = await UserModel.findOne({ email });
    console.log(user);
    if(user){
        return done(null, user);
    }
    user = {
        first_name: profile._json.name,
        last_name:'' ,
        email,
        age: 20,
        password: ''
    }
    const newUser = await UserModel.create(user);
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
        const user = await UserModel.findById(uid);
        console.log('deserialize', user)
        done(null, user);
    })
}