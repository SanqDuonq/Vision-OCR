import mongoose, { Schema } from "mongoose";
import { IPlace } from "../interface/place.interface";

const PlaceModel = new Schema<IPlace>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true, 
    },
    category: {
        type: String,
        required: true,
    }  
}, {collection: 'Place', timestamps: true})

const Place = mongoose.model('Place', PlaceModel);
export default Place;