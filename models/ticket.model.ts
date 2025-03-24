import mongoose from "mongoose";
import { ITicket } from "../interface/ticket.interface";

const TicketModel = new mongoose.Schema<ITicket>({
    airline: {
        type: String
    },
    airlineCode: {
        type: String
    },
    passengerName: {
        type: String
    },
    gate: {
        type: String
    },
    seat: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    departureTime: {
        type: Date
    }
})

const Ticket = mongoose.model('Ticket', TicketModel);
export default Ticket;