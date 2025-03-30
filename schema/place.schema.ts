import { z } from "zod";

export const placeSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    category: z.string().min(1, 'Category is required')
})