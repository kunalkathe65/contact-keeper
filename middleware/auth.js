const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {

    //Extract the token from header
    const token= req.header('x-auth-token');

    //Check for the existence of token
    if(!token){
        return res.status(401).json({msg:"No token, authorization denied!"});
    }
    try{

        //Verify the token and verify() method gives us the payload which is just userID in our case
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        //Assign the ID from payload to the request object
        req.user= decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:"Not a valid token!"});
    } 
}
