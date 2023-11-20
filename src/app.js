import express from 'express';
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import path from 'path';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import productManager from './productManager.js';
import viewsRoutes from './routes/viewsRoutes.js';
import indexRouter from './routes/views/index.router.js';
import chatRouter from './routes/views/chat.router.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')

app.get('/home',async (req,res) => {
    const product = await productManager.getProducts();
    res.render('index' , { title: 'handlebars y socket.io',product});
});
app.use('/', viewsRoutes);
app.use('/api',productRouter);

app.use('/api',cartRouter);
app.use('/db',indexRouter);
app.use('/db',chatRouter);
app.use((error,req,res,next) => {
    const message = `error desconocido: ${error.message}`;
    console.error(message);
    res.status(500).json({message});
    next();
})

 export default app;

