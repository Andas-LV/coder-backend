import { Request, Response } from 'express';
import { userSchema } from '@/schemas/users';
import { saveUser } from '@/service/users';
import { z } from 'zod';

export async function createUserController(
	req: Request,
	res: Response,
) {
	try {
		const validatedData = userSchema.parse(req.body);

		const user = await saveUser(validatedData);

		const status = user.createdAt?.getTime() === user.updatedAt?.getTime() ? 201 : 200;

		res.status(status).json(user);
	} catch (error) {
		if (error instanceof z.ZodError) {
			if (error.message.includes('already exists')) {
				return res.status(409).json({ error: error.message });
			}
			return res.status(400).json({ error: error.message });
		}

		console.error('Error in /users:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
