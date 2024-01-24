import path from 'path';
import url from 'url';
import bcrypt, { genSaltSync } from 'bcrypt';
import passport from 'passport';
import { title } from 'process';
import { lutimes } from 'fs';
//import { createHash } from 'crypto';


const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => {
    const result = bcrypt.hashSync(password, genSaltSync(10));
    return result;
};

export const isValidPassword = (password,user) => {
    const result = bcrypt.compareSync(password, user.password);
    return result;
};


export const authRolesMiddleware = (userRole) => (req, res, next) => {
    if(!req.user){
        console.log({message: 'Unauthorized'})
        return res.redirect('/login')
    }
        console.log('userRol',userRole);
        let currentRole = req.user.role;
        console.log('rol',currentRole);
        const valid = userRole.includes(currentRole);
        console.log('valid',valid)
        if(valid){
            return next();
        }
        
        return res.status(403).render('error', {messageError: 'Acceso Denegado'});
};
