import mongoose from "mongoose"

export interface ITicket {
    userId: mongoose.Types.ObjectId,
    airline: string,
    airlineCode: string
    passengerName:  string
    gate: string,
    seat: string
    from: string
    to: string
    departureTime: Date,
    departureDay: Date,
    suggest: {name: string, address: string}[]
}

export interface ITouristPlace {
    name: string
}