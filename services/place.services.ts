import { IPlace } from "../interface/place.interface";
import Place from "../models/place.model";
import { throwError } from '../utils/throw-error';

class PlaceServices {    
	async add(place: IPlace) {
		return await Place.create(place);
	}   

    async edit(id: string, data: IPlace) {
        const update =  await Place.findByIdAndUpdate(id, data, {new: true})
        if (!update) {
            throwError(404, 'Place not found');
        }
        return update;
    }

	async remove(id: string) {
		const remove =  await Place.findByIdAndDelete(id);
        if (!remove) {
            throwError(404, 'Place not found');
        }
        return remove;
	}

	async get(address: string) {
        const regex = new RegExp(address, 'i');
        const data =  await Place.aggregate([
            {$match: {address: {$regex: regex}}},
            {$sample: {size: 4}}
        ])
        console.log('Found places:', data);
        return data;
    }    
}

export default new PlaceServices();
