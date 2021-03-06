const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route     GET  api/auth
// @desc      Get logged in user
// @access    Private
//everytime we've to access private route the middleware 'auth()' will be called
router.get('/',auth, async (req,res) => {
    try{
        //fetching the user from database excluding the password using the ID we've attached to the request object
        const user = await User.findById(req.user).select('-password');
        res.json(user);    

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

// @route     POST  api/auth
// @desc      Authenticate user & get token
// @access    Public
router.post('/',[
    check('email','Please enter a valid email!!').isEmail(),
    check('password','Please enter a password with 8 or more chars!!').isLength({min:8})
],async (req,res) => {
    
    //collecting all the errors occurred in validation
    const errors = validationResult(req);  
    if(!errors.isEmpty()){                 //if there are errors     
        return res.status(400).json({errors:errors.array()});
    }

    //else destructuring the request body content
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});
        
        //if user with given email doesn't found
        if(!user){
            return res.status(400).json({msg:"Invalid Credentials!"});
        }
        //comparing the entered password and password in database
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials!"});
        }
        //else if credentials are matched then just return a token
        //creating a payload which is just a piece of info about user here its ID(virtual) generated by mongoose
        const payload = {   
            user: user.id
        }

        const secret = config.get('jwtSecret');

        //signing JWT with payload, secret(anything in String), options(like token expire time in seconds etc...) and callback
        jwt.sign(payload,secret,{
            expiresIn:36000000
        },(err,token) => {
            if(err) throw err;
            else{
                res.json({ token })
            }
        })
        }catch(err){
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    });

module.exports = router;