import { Request, Response } from 'express';

type HandlerFn = (req: Request, res: Response) => Promise<any>;

export const handleRequest = (handler: HandlerFn) => async (req: Request, res: Response) => {
	try {
		await handler(req, res);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
