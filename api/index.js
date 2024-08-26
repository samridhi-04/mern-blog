import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client origin
    credentials: true, // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));
app.use(express.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDb is connected');
}).catch((err) => { console.log(err); });
app.use('/api/user', userRoute);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message||"Internal Server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});