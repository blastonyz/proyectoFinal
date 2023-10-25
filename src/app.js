const express = require('express');
const productRouter = require('./routes/productRoute')
const cartRouter = require('./routes/cartRoutes')

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',(req,res) => {
    res.send('home')
});

app.use('/api',productRouter, async (req,res,next) => {
   res.status(200).json();
   next();
});

app.use('/api',cartRouter, async (req,res) => {
    res.status(200).json();
 });


app.listen(port,()=>{console.log(`Server runing on port:${port} `)})

