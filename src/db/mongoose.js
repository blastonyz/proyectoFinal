import mongoose from 'mongoose';
import config from '../config/config.js';

export const initDB = async () => {
    try {
        const URI = config.mongodbUri;
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.error('error al conectarse a db');
    }
}