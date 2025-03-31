import { z } from "zod";

export const hotelSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    star: z.number().min(1, 'Star is required')
})