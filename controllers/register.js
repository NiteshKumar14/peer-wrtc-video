const user = require('../models/model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse')
const createToken = require('../utils/createToken')
module.exports=async function Register(req,res,next){
    //check if user already exists 
    // console.log("res object ",res);
    const {username,password, email} = req.body;
    try {
        if(!email||!password||!email)
        {
            return next(new errorResponse("credentials cannot be blank",401));
        }
        if(await user.findOne({username})){
          return   next(new errorResponse("username already exists",401));
           
        }
        if(await user.findOne({email})){
           return  next(new errorResponse("Email already exists",401));
            
        }
        
        const newUser = await user.create({
            username,
            password,
            email
        });

        //we have to create a token 
        createToken(username,password,newUser,res);
      
       



        
    } catch (error) {
       next(error);
        
    }

    

}