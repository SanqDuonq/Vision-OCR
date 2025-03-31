import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "../interface/restaurant.interface";

const RestaurantModel = new Schema<IRestaurant>({
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
}, {collection: 'Restaurant', timestamps: true})

const Restaurant = mongoose.model('Restaurant', RestaurantModel);
export default Restaurant;