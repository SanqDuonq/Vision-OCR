import createHttpError from "http-errors";
import { ITicket } from "../interface/ticket.interface";
import Ticket from "../models/ticket.model";

class TicketServices {
    private async checkTicket(airlineCode: string, seat: string) {
        return await Ticket.findOne({airlineCode, seat});
    }

    add = async (ticket: ITicket) => {
        const existingTicket = await this.checkTicket(ticket.airlineCode, ticket.seat);
        if (existingTicket) {
            throw createHttpError(404,"Vé đã tồn tại!");
        }
        return await Ticket.create(ticket);
    }
}

export default new TicketServices();