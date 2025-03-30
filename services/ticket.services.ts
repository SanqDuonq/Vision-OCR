import { ITicket } from "../interface/ticket.interface";
import Ticket from "../models/ticket.model";
import { throwError } from "../utils/throw-error";

class TicketServices {
    private async checkTicket(airlineCode: string, seat: string) {
        return await Ticket.findOne({airlineCode, seat});
    }

    add = async (ticket: ITicket, userId: string) => {
        const existingTicket = await this.checkTicket(ticket.airlineCode, ticket.seat);
        if (existingTicket) {
            throwError(409,"Vé đã tồn tại!");
        }
        console.log(userId)
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