const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');




// @route     POST  api/user
// @desc      Register a user
// @access    Public
router.post('/',[
    check('name','Please enter name!').not().isEmpty(),
    check('email','Please enter email!').isEmail(),
    check('password','Please enter password with 8 or more characters!').isLength({min:8})
],
async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const {name,email,password} = req.body;
    
    try{

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists!!"});
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        res.send("user saved..")
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error!!');
    }

});

module.exports = router;