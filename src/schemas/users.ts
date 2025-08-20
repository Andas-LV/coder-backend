import { z } from 'zod';
import { AuthProvider } from '@prisma/client';

export const userSchema = z.object({
    id: z.string(),
    email: z.string().min(1),
    name: z.string().nullable(),
    image: z.string().nullable(),
    provider: z.nativeEnum(AuthProvider),
    providerId: z.string(),
});