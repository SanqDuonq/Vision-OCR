import { IPlace } from "../interface/place.interface";
import { IRestaurant } from "../interface/restaurant.interface";
import Restaurant from "../models/restaurant.model";
import { throwError } from '../utils/throw-error';

class RestaurantServices {    
	async add(restaurant: IRestaurant) {
		return await Restaurant.create(restaurant);
	}   

    async edit(id: string, data: IPlace) {
        const update =  await Restaurant.findByIdAndUpdate(id, data, {new: true})
        if (!update) {
            throwError(404, 'Restaurant not found');
        }
        return update;
    }

	async remove(id: string) {
		const remove =  await Restaurant.findByIdAndDelete(id);
        if (!remove) {
            throwError(404, 'Restaurant not found');
        }
        return remove;
	}

	async get(address: string) {
        const regex = new RegExp(address, 'i');
        const data =  await Restaurant.aggregate([
            {$match: {address: {$regex: regex}}},
            {$sample: {size: 4}}
        ])
        console.log('Found restaurant:', data);
        return data;
    }    
}

export default new RestaurantServices();
