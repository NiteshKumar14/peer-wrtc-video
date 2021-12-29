const user = require('../models/model')
const jwt = require('jsonwebtoken')
module.exports = async function forgotPassword(req,res){
    const email = req.body.email;
    //check if user exists
    const userExists  = await user.findOne({email});
    if(!userExists){
        return res.status(201).json("email cannot be sent");
    }
    console.log(userExists);
    const JWT_SECRET = process.env.JWT_SECRET;
    const  secret = JWT_SECRET + userExists.password;
    console.log("secret 1",secret );
    const payload = {id:userExists._id};
    const resetToken = jwt.sign(payload,secret,{expiresIn:"5s"});
    const resetLink = `http://localhost:${process.env.PORT}/auth/reset-password/${userExists._id}/${resetToken}`;
    console.log(resetLink)
    res.send("password reset link sent...");

}