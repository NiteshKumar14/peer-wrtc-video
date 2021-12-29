const jwt = require('jsonwebtoken');
module.exports=async function createToken(username,email,user,res)
    {
        //we have to create a auth token 
        const payload = {id:user._id,user:username};
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"});
        user.token = token ;
        await user.save((err,result)=>{
            if(err){
                return res.staus(500).json({message:error.message});

                
            }
            return res.status(200).json({success:true,message:"Registered successfully",token:token});
        });

    }