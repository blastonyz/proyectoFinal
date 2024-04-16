import { Command } from 'commander';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
        .option('-d', 'Flag para Debug', false)
        .option('--persistence <persistence>','persistencia de archivos: MongoDB | JSON','MongoDB') 
        .option('--mode <mode>', 'Modo de ejecucion: dev | production', 'production');
   
program.parse();



export default {
    debug: program.opts().d,
    persistence: program.opts().persistence,
    mode: program.opts().mode,
    port: process.env.PORT || 3000,
    mongodbUri:process.env.MONGODB_URI,
    session_secret: process.env.SESSION_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    mail: {
        emailServices: process.env.EMAIL_SERVICES || 'gmail',
        emailPort: process.env.EMAIL_PORT || 587,
        emailUser: process.env.EMAIL_USER,
        emailPassword: process.env.EMAIL_PASSWORD
    }
};
