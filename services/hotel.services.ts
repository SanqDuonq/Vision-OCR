import { IPlace } from "../interface/place.interface";
import Hotel from "../models/hotel.model";
import { throwError } from '../utils/throw-error';

class HotelServices {    
	async add(place: IPlace) {
		return await Hotel.create(place);
	}   

    async edit(id: string, data: IPlace) {
        const update =  await Hotel.findByIdAndUpdate(id, data, {new: true})
        if (!update) {
            throwError(404, 'Hotel not found');
        }
        return update;
    }

	async remove(id: string) {
		const remove =  await Hotel.findByIdAndDelete(id);
        if (!remove) {
            throwError(404, 'Hotel not found');
        }
        return remove;
	}

	async get(address: string) {
        const regex = new RegExp(address, 'i');
        const data =  await Hotel.aggregate([
            {$match: {address: {$regex: regex}}},
            {$sample: {size: 4}}
        ])
        console.log('Found Hotels:', data);
        return data;
    }    
}

export default new HotelServices();
