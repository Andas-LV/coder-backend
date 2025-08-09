import { NextFunction, Request, Response, Router } from 'express';
import { authenticateToken } from '@/middleware';
import {
	createChatController,
	getUserChatsController,
	getChatByIdController,
	deleteChatController,
	updateChatNameController,
} from '@/controllers/chatsController';

const router = Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
	await authenticateToken(req, res, next);
});

router.post('/create', async (req: Request, res: Response) => {
	await createChatController(req, res);
});

router.get('/list', async (req: Request, res: Response) => {
	await getUserChatsController(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
	await getChatByIdController(req, res);
});

router.patch('/:id/update', async (req: Request, res: Response) => {
	await updateChatNameController(req, res);
});

router.delete('/:id/delete', async (req: Request, res: Response) => {
	await deleteChatController(req, res);
});

export const chatsRoutes = router;
