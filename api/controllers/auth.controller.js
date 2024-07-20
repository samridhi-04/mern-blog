import User from "../models/user.model.js";
import Bcryptjs from 'bcryptjs'
export const signup = async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username||!email||!password||username===""||email===""||password==="" ){
        return res.status(400).json({message:"All feilds are required"})
    }

    const hashedpassword = Bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,email,password :hashedpassword,
    })
    try {
        
        await newUser.save();
        res.json('Signup successful')
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}