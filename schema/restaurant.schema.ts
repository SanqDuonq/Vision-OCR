import { z } from "zod";

export const restaurantSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    category: z.string().min(1, 'Category is required')
})