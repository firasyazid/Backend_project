const express = require('express');
const app = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');
const api = process.env.API_URL;

 
 const usersRouter = require('./routers/user.js');
  
 
app.use(cors()); 
app.options('*',cors ());
//
app.use(express.json()); 
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads' , express.static(__dirname + '/public/uploads')) ;

//Routes
 app.use(`${api}/users`, usersRouter);
 


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
     console.log('server is running http://localhost:3000');
})