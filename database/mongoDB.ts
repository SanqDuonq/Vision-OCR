import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`Connected successful mongoDB ${connect.connection.host}`)
    } catch (error) {
        console.log(`Connected failed mongoDB ${error}`)
    }
}

export default connectMongoDB;