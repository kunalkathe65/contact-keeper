const express = require('express');

const app = express();

const PORT= process.env.PORT | 5000;

//Defining routes
app.use('/api/user',require('./routes/user'));
app.use('/api/contact',require('./routes/contact'));
app.use('/api/auth',require('./routes/auth'));


app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});