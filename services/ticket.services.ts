import { ITicket } from "../interface/ticket.interface";
import Ticket from "../models/ticket.model";
import { throwError } from "../utils/throw-error";
import hotelServices from "./hotel.services";
import placeServices from "./place.services";
import restaurantServices from "./restaurant.services";

class TicketServices {
    private async checkTicket(airlineCode: string, seat: string) {
        return await Ticket.findOne({airlineCode, seat});
    }

    add = async (ticket: ITicket, userId: string) => {
        const existingTicket = await this.checkTicket(ticket.airlineCode, ticket.seat);
        if (existingTicket) {
            throwError(409,"Vé đã tồn tại!");
        }
        const suggest = await placeServices.get(ticket.to);
        ticket.places = suggest.map((place) => {
            return {
                name: place.name,
                address: place.address,
                category: place.category
            }
        })
        const suggestRes = await restaurantServices.get(ticket.to);
        ticket.restaurants = suggestRes.map((place) => {
            return {
                name: place.name,
                address: place.address,
                category: place.category
            }
        })
        const suggestHot = await hotelServices.get(ticket.to);
        ticket.hotels = suggestHot.map((place) => {
            return {
                name: place.name,
                address: place.address,
                star: place.star
            }
        })
        return await Ticket.create({...ticket, userId});
    }

    edit = async (id: string, data: Partial<ITicket>) => {
        const ticket = await Ticket.findById(id);
        if(!ticket) {
            throwError(404, 'Not found ticket');
        }
        Object.assign(ticket!, data);
        return await ticket?.save();
    }

    remove = async (id: string) => {
        const ticket = await Ticket.findById(id);
        if(!ticket) {
            throwError(404, 'Not found ticket');
        }
        await Ticket.findByIdAndDelete(id);
    }

    get = async (userId: string) => {
        return await Ticket.find({ userId });
    }
}

export default new TicketServices();