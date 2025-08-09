import { z } from 'zod';

export const userSchema = z.object({
    id: z.string(),
    email: z.string().min(1),
    name: z.string().nullable(),
    image: z.string().nullable(),
    provider: z.string(),
    providerId: z.string(),
});