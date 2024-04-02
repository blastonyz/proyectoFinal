import express from 'express';
import handlebars from 'express-handlebars';
import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { __dirname } from './utils.js';
import { generateProduct } from './utils/utils.mocking.js';
import path from 'path';
import {init as initPassport} from './passport/passport.config.js';
import config from './config/config.js';
import { errorHandlerMiddleware } from './utils/error.handler.middleware.js';
import { addLogger,logger } from './utils/logger.js';

import cartRouter from "./routes/views/cartRoutes.js"
import productRouter from "./routes/productRoute.js";
import productManager from './dao/productManager.js';
import viewsRoutes from './routes/viewsRoutes.js';
import indexRouter from './routes/views/index.router.js';
import chatRouter from './routes/api/chat.router.js';
import sessionRouter from './routes/api/session.router.js'
import sessionRender from './routes/views/sessions.render.js'
import usersRouter from './routes/api/users.router.js';
import productCRUD from './routes/api/products.mongo.js'

const SESSION_SECRET = config.session_secret;

const app = express();
console.log('modo', config.mode);

app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));

if(config.mode === 'production'){
    const swaggerOpts = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Iron Tools ferreteria',
                description: 'aplicacion e-commerce rubro ferreteria'
            },
        },
        apis: [path.join(__dirname,'docs','**','*.yaml')]
    };
    const specs = swaggerJsDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));    
}

app.use(sessions({
    store: MongoStore.create({
       mongoUrl: config.mongodbUri,
       mongoOptions: {}, 
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))



initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//persistencia de memoria local con websocket
app.get('/home',async (req,res) => {
    const product = await productManager.getProducts();
    res.render('index' , { title: 'handlebars y socket.io',product});
});
//persistencia de memoria JSON local
app.use('/old',productRouter);
//

//middleware de ruta
app.get('/', (req,res) =>{
    res.redirect('/login')
});

//persistencia MongoDB
//login
app.use('/', sessionRender, sessionRouter);

//paginacion de productos, gestion usuarios, cart, chat, crud productos con endpoint
app.use('/api',indexRouter, usersRouter,cartRouter,chatRouter,productCRUD);


//crud productos con websocket y mongoDB
app.use('/set',viewsRoutes);

//mocking
app.get('/mockingporducts',(req,res)=>{
    const productMocks = [];
    for (let index = 1; index < 100; index++) {
        productMocks.push(generateProduct());
        
    }
 res.status(200).json(productMocks);   
}),

//logger Test
app.get('/loggerTest', (req,res) => {
    console.log('Niveles del logger en /loggerTest:', req.logger.levels);
    logger.debug('hola desde debug');
    logger.http('hola desde http');
    logger.info('hola desde info');
    logger.warning('hola desde warning');
    logger.error('hola desde error ');
    logger.fatal('hola desde fatal ');
    
   
    res.status(200).send({message:'logs'});
})
//artillery test
app.get('/slow',(req,res)=>{
    let counter = 0;
    for (let index = 0; index < 10000; index++) {
        counter += index; 
        
    }
 res.status(200).json({counter});   
}),


app.use(errorHandlerMiddleware);


 export default app;
