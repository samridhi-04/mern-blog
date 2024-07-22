import User from "../models/user.model.js";
import Bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandler(400, 'All fields are required'));
    }

    // Hash the password
    const hashedPassword = Bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        // Save the new user
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }
};

// Signin Controller
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Find the user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Verify the password
        const validPassword = Bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid Password')); // Changed status code to 401 for unauthorized
        }

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: pass, ...rest } = validUser._doc;

        // Send response with token
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
};

// Google OAuth Controller
export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (user) {
            // User exists, generate a new token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password, ...rest } = user._doc;
            return res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        } else {
            // User does not exist, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = Bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: name.toLowerCase().split(' ').join(' ') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password, ...rest } = newUser._doc;

            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }
    } catch (error) {
        next(error);
    }
};
