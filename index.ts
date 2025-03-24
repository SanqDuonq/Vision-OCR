import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFoundRoute } from './middleware/catch-error.middleware';
import ocrRoute from './router/ocr.routes';
import authRoute from './router/auth.routes';
import ticketRoute from './router/flight.routes';
import connectMongoDB from './database/mongoDB';
import redis from './database/redis';
dotenv.config();

const app = express();

const port = process.env.PORT
app.use(express.json());
app.use('/api',ocrRoute)
app.use('/api/auth', authRoute);
app.use('/api/flight', ticketRoute);
app.use(notFoundRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    connectMongoDB();
    redis
})