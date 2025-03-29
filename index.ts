import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFoundRoute } from './middleware/catch-error.middleware';
import ocrRoute from './router/ocr.route';
import authRoute from './router/auth.route';
import ticketRoute from './router/ticket.route';
import uploadRoute from './router/upload.route';
import connectMongoDB from './database/mongoDB';
import redis from './database/redis';
import connectCloudinary from './utils/cloudinary';
import cookiesParser from 'cookie-parser';
import passport from 'passport';
dotenv.config();

const app = express();

const port = process.env.PORT || 3001;
app.use(express.json());

app.use(cookiesParser());
app.use(passport.initialize());

app.use('/upload',uploadRoute)
app.use('/api',ocrRoute)
app.use('/api/auth', authRoute);
app.use('/api/ticket', ticketRoute);
app.use(notFoundRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    connectMongoDB();
    redis
    connectCloudinary();
})