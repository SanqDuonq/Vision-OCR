import mongoose, { Schema } from "mongoose";
import { IHotel } from "../interface/hotel.interface";

const HotelModel = new Schema<IHotel>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true, 
    },
    star: {
        type: Number,
        required: true,
    }  
}, {collection: 'Hotel', timestamps: true})

const Hotel = mongoose.model('Hotel', HotelModel);
export default Hotel;