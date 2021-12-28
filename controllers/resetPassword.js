const user = require('../models/model')
const jwt = require('jsonwebtoken')
module.exports= async function resetPassword(req,res){
   
    //is id and token valid 

    const {id,token} = req.params;
    const _id = id;
    const idExists = await user.findOne({_id});
    if(!idExists){
        return res.status(401).json({message:"Bad request"});
    }
    console.log(idExists);
    try {
        console.log(idExists.password,"hh");
        const secret = process.env.JWT_SECRET + idExists.password;
        console.log("secret 2",secret);
        const payload = jwt.verify(token,secret);
        idExists.password = "joker";
        await idExists.save((err,resule)=>{
            if(err)
            {
            return res.status(500).json({success:false,message:err.message});}
            return res.status(200).json({sucess:true,message:"Password changed successfully"});
        });
        
        
    } catch (error) {
        if(error.message ==="jwt expired")
        return res.status(401).json({success:false,message:"reset link expired request for a new one "});
        return res.status(400).json({success:false,message:"invalid reset link"});
        
        
    }
}