import mongoose from "mongoose";
import { ITicket } from "../interface/ticket.interface";

const TicketModel = new mongoose.Schema<ITicket>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    departureDay: {
        type: Date
    },
    departureTime: {
        type: Date
    },
    suggest: [
        {
            name: {type: String},
            address: {type: String}
        }
    ]
}, {collection: 'Ticket', timestamps: true})

const Ticket = mongoose.model('Ticket', TicketModel);
export default Ticket;