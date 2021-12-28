const jwt = require('jsonwebtoken')
const errorResponse = require('../utils/errorResponse')
module.exports=validateToken=async(req,res,next)=>{
    const {token} = req.body;
    try {
        const payload =jwt.verify(token,process.env.JWT_SECRET);
        return res.status(200).json({success:true,message:"valid token"});
        
    } catch (error) {
        next(new errorResponse('invalid token',401));
        
        
    }
}