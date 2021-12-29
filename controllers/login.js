const user = require('../models/model');
const bcrypt = require('bcryptjs');
const errorResponse = require('../utils/errorResponse');
const createToken = require('../utils/createToken')
module.exports=async function login(req,res,next){
    
    const username = req.body.username;
    const password = req.body.password;
    //if user exists 
    try { 
        const userExists = await user.findOne({username}).select({username:1,password:1});
      
        if(!userExists)
        {
            return next(new errorResponse("invalid credentials",401));
        }
        console.log(userExists);
      
            
        if(await matchPassword(password,userExists.password)){
            return createToken(username,password,userExists,res);
        }
        return next(new errorResponse("invalid credentials",401));
        


        
    } catch (error) {
        next(error);
    }


}
async function matchPassword(enteredPassword,password){
   return await bcrypt.compare(enteredPassword,password);
}