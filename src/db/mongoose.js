import mongoose from 'mongoose';

export const URI = 'mongodb+srv://blastonyzamora:ginaplumero22@cluster0.oc8jz2z.mongodb.net/ecommerce?retryWrites=true&w=majority';

export const initDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.error('error al conectarse a db');
    }
}