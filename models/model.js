const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema  = new mongoose.Schema({
    username:{
        type: String,
        require :[true,'Please enter a user name'],
        unique:true,
        trim:true,
    },
    password :{
        type: String,
        require :[true,'Please enter your password it cannot be blank'],
        trim:true,
    },
    email:{
        type:String,
        require:[true,"Please provide a valid email"],
        trim:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Please provide a valid email"]

    },
    token :{
        type:String,
        unique:true
    }

});
userSchema.pre("save",async function(next){
    //if the password is modified
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const user = mongoose.model("User",userSchema);
module.exports=user;