import User from "../models/user.model.js";
import Bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup = async(req,res,next)=>{
    const {username, email, password} = req.body;
    if(!username||!email||!password||username===""||email===""||password==="" ){
        return next(errorHandler(400,'All feilds are required'))
    }

    const hashedpassword = Bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,email,password :hashedpassword,
    })
    try {
        
        await newUser.save();
        res.json('Signup successful')
    } catch (error) {
        next(error)
        
    }
}