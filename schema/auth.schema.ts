import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1, 'Fullname is required').max(30, 'Fullname must be exceed 30 characters'),
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email is must be @gmail.com'),
    password: z.string().regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#+^])[A-Za-z\\d@$!%*?&#+^]{8,32}$'),
        'Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),      
    avatar: z.string().min(1, 'Avatar is required')
})

export const signInSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email is must be @gmail.com'),
    password: z.string().min(1, 'Password is required').max(32, 'Password must be at under 32 characters')
})
