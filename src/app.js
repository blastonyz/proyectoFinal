import express from 'express';
import handlebars from 'express-handlebars';
import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { URI } from './db/mongoose.js';
import { __dirname } from './utils.js';
import path from 'path';
import {init as initPassport} from './passport/passport.config.js'

import cartRouter from "./routes/views/cartRoutes.js"
import productRouter from "./routes/productRoute.js";
import productManager from './productManager.js';
import viewsRoutes from './routes/viewsRoutes.js';
import indexRouter from './routes/views/index.router.js';
import chatRouter from './routes/views/chat.router.js';
import sessionRouter from './routes/api/session.router.js'
import sessionRender from './routes/views/sessions.render.js'



const SESSION_SECRET = 'W9=WyrbA9(8^';

const app = express();

app.use(sessions({
    store: MongoStore.create({
       mongoUrl: URI,
       mongoOptions: {}, 
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
app.use(passport.session());

//persistencia con websocket
app.get('/home',async (req,res) => {
    const product = await productManager.getProducts();
    res.render('index' , { title: 'handlebars y socket.io',product});
});
//login
app.use('/api', sessionRender, sessionRouter);
//realtime, websocket y mongoDB
app.use('/', viewsRoutes);
//persistencia de archivos
app.use('/old',productRouter);

app.use('/api',cartRouter);
//paginacion
app.use('/api',indexRouter);
//chat
app.use('/api',chatRouter);

app.use((error,req,res,next) => {
    const message = `error desconocido: ${error.message}`;
    console.error(message);
    res.status(500).json({message});
    next();
})

 export default app;

