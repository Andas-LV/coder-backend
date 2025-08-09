import { Request, Response } from "express";
import { fetchUserMe } from '@/service/account';

export async function getUserMe(req: Request, res: Response) {
	try {
		if (!req.user?.id) {
			return res.status(400).json({ error: 'User ID is missing' });
		}

		const user = await fetchUserMe(req.user.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		console.error('Error in /me endpoint:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}