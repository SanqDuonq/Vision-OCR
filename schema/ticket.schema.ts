import { z } from "zod";

export const ticketSchema = z.object({
    airline: z.string().min(1, 'Airline is required'),
    airlineCode: z.string().min(1, 'Airline code is required'),
    passengerName: z.string().min(1, 'Passenger name is required'),
    gate: z.string().min(1, 'Gate is required'),
    seat: z.string().min(1, 'Seat is required'),
    from: z.string().min(1, 'From is required'),
    to: z.string().min(1, 'To is required'),
    departureDay: z.string().min(1, 'Departure day is required'),
    departureTime: z.string().min(1, 'Departure time is required')
});

