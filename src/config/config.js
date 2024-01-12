import { Command } from 'commander';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
        .option('-d', 'FLag para Debug', false)
        .option('--mode <mode>', 'Modo de ejecucion: dev | prod', 'prod');

program.parse();



export default {
    mode: program.opts().mode,
    debug: program.opts().d,
    port: process.env.PORT || 3000,
    mongodbUri:process.env.MONGODB_URI,
    session_secret: process.env.SESSION_SECRET
};