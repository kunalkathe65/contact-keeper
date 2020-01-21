const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//first it will look for a environment variable "PORT" (in production env) or else will start a server on 5000
const PORT= process.env.PORT | 5000;   

//Init Middleware
app.use(express.json({ extended:false})); 

//Defining routes
app.use('/api/user',require('./routes/user'));
app.use('/api/contact',require('./routes/contact'));
app.use('/api/auth',require('./routes/auth'));


app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});