import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { TUser } from '@/types/User';
import config from '@/config';

const prisma = new PrismaClient();

declare global {
	namespace Express {
		interface Request {
			user?: Partial<TUser>;
		}
	}
}

export const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			console.error('No token provided');
			return res.status(401).json({ error: 'No token provided' });
		}

		const decoded = jwt.verify(token, config.nextAuthSecret) as JwtPayload;

		const userId = decoded.sub || decoded.userId || decoded.id;
		if (!userId) {
			console.error('Invalid token payload: missing sub, userId, or id');
			return res.status(401).json({ error: 'Invalid token payload' });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId as string },
		});

		if (!user) {
			console.error('User not found for id:', userId);
			return res.status(401).json({ error: 'User not found' });
		}

		req.user = {
			id: user.id,
			email: user.email,
			name: user.name,
			image: user.image,
			provider: user.provider,
			providerId: user.providerId,
		};

		next();
	} catch (error: any) {
		console.error('Token verification failed:', error.message, error); // Для отладки
		return res.status(401).json({ error: 'Invalid token' });
	}
};