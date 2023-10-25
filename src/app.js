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

app.use('/api',productRouter);

app.use('/api',cartRouter);


app.listen(port,()=>{console.log(`Server runing on port:${port} `)})