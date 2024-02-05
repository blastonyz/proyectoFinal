import { Command } from 'commander';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
        .option('-d', 'Flag para Debug', false)
        .option('--mode <mode>', 'Modo de ejecucion: dev | production', 'production');

program.parse();



export default {
    mode: program.opts().mode,
    debug: program.opts().d,
    port: process.env.PORT || 3000,
    mongodbUri:process.env.MONGODB_URI,
    session_secret: process.env.SESSION_SECRET,
    mail: {
        emailServices: process.env.EMAIL_SERVICES || 'gmail',
        emailPort: process.env.EMAIL_PORT || 587,
        emailUser: process.env.EMAIL_USER,
        emailPassword: process.env.EMAIL_PASSWORD
    }
};
