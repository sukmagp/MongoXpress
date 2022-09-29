require('./config/mongoose');
const express = require('express');
const path = require('path');
const app = express();
const productRouterV1 = require('./app/product/routes');
const productRouterV2 = require('./app/product_v2/routes');
const logger = require('morgan');
const cors = require('cors')

//use cors
app.use(cors())

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouterV1);
app.use('/api/v2', productRouterV2);
app.use((req, res, next) =>{
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource' + req.originalUrl + ' Bad Request 404'
    });
});

app.listen(3030, () => console.log('Server: http://localhost:3030'))