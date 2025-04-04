import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFoundRoute } from './middleware/catch-error.middleware';
import ocrRoute from './router/ocr.route';
import authRoute from './router/auth.route';
import ticketRoute from './router/ticket.route';
import placeRoute from './router/place.route';
import restaurantRoute from './router/restaurant.route';
import hotelRoute from './router/hotel.route';
import uploadRoute from './router/upload.route';
import connectMongoDB from './database/mongoDB';
import connectCloudinary from './utils/cloudinary';
import cookiesParser from 'cookie-parser';
import passport from 'passport';
import './utils/passport';
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cookiesParser());
app.use(passport.initialize());

app.use('/upload',uploadRoute)
app.use('/api/ocr',ocrRoute)
app.use('/api/auth', authRoute);
app.use('/api/ticket', ticketRoute);
app.use('/api/place', placeRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/hotel', hotelRoute);

app.use(notFoundRoute);
app.use(errorHandler);

connectMongoDB();
connectCloudinary();

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
})

export default app;