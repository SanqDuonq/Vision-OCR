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
    places: {name: string, address: string, category: string}[],
    restaurants: {name: string, address: string, category: string}[],
    hotels: {name: string, address: string, star: number}[]
}

export interface ITouristPlace {
    name: string
}