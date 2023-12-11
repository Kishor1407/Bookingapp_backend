const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const { createError } = require("../utils/error.js");
const jwt = require('jsonwebtoken');
const { cookie } = require('cookie');
const register = async (req,res,next)=>{
    try{ 
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(hash);
        const newUser = new User({
            ...req.body,
            password:hash,
        });
        await newUser.save();
        res.status(200).send("User has been created");
    }
    catch(err){
        next(err);
    }
}
const login =async (req,res,next)=>{
    try{
        console.log("sdvxc")
        // const { username, password } = req.body;
        const user =await User.findOne({ username:req.body.username });
        // const user =await User.findOne({ username:req.body.username });
        if(!user) return next(createError(404,"User not found"));
        // console.log("sfvf");

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(isPasswordCorrect) return next(createError(400,"wrong password"));

        const token =jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)
        const{ password ,isAdmin, ...otherDetails } = user._doc;
        console.log(token);
        res.cookie("access_token", token, { httpOnly:true,});
        // const{ password ,isAdmin, ...otherDetails } = user._doc;
        // const status = err.status || 500;
        res.status(200).json({details: {...otherDetails},isAdmin});
    }
    catch(err){
        //  const status = err.status || 500;
        next(err);
    }
};

module.exports= {register,login};
