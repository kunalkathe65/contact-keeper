const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({

    //To create a relationship between a user and their related contacts because user can't access all contacts in database
    //ObjectId is the field mondoDB adds to every document 
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"Personal"
    }
});

module.exports = mongoose.model('contact',ContactSchema);