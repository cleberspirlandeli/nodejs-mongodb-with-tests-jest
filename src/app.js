require('dotenv').config();

const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const Global = require("./Common/middlewares/errorglobal.middlewares")
const morgan = require('morgan')
const AppError = require('./Common/middlewares/appError');

const ErrorModel = require('./Common/middlewares/errorglobal.model')

const app = express();

const server = require('http').Server(app);

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
require('./route/index')(app);


app.use(async (error, request, response, next) => {

    let message = "Ops, ocorreu um erro inesperado. Tente novamente mais tarde.";

    if (error instanceof AppError) {
        return response
            .status(error.status)
            .json({ message: error.message });
    }

    if(error.name == "MongoError") {
        const dto = {
            code: error.code ? error.code : '',
            driver: error.driver ? error.driver : '',
            errmsg: error.errmsg ? error.errmsg : '',
            index: error.index ? error.index : '',
            message: error.message ? error.message : '',
            name: error.name ? error.name : '',
            keyPattern: error.keyPattern ? error.keyPattern : [],
            keyValue: error.keyValue ? error.keyValue : [],
        }

       const err = await ErrorModel.create(dto);
       if(err){
           message += ` Código: ${err._id}`;
       }
    }

    response
        .status(500)
        .json({ "error": message});
});

module.exports = server;