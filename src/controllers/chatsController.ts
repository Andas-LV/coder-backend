import { Request, Response } from 'express';
import { createChat, deleteChat, getChatById, getUserChats, updateChatName } from '@/service/chatService';
import { Provider } from '@prisma/client';
import { handleRequest } from '@/utils/handleRequest';

export const createChatController = handleRequest(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const aiProvider = req.body.aiProvider as Provider;

	if (!userId) {
		return res.status(401).json({ error: 'Unauthorized: no user ID' });
	}

	const chat = await createChat(userId, aiProvider);
	res.json(chat);
});

export const getUserChatsController = handleRequest(async (req: Request, res: Response) => {
	const userId = req.user?.id;

	if (!userId) {
		return res.status(401).json({ error: 'Unauthorized: no user ID' });
	}

	const chats = await getUserChats(userId);
	res.json(chats);
});

export const getChatByIdController = handleRequest(async (req: Request, res: Response) => {
	const chatId = req.params.id;

	if (!chatId) {
		return res.status(400).json({ error: 'Chat ID is required' });
	}

	const chat = await getChatById(chatId);

	if (!chat) {
		return res.status(404).json({ error: 'Chat not found' });
	}

	res.json(chat);
});

export const updateChatNameController = handleRequest(async (req: Request, res: Response) => {
	const chatId = req.params.id;
	const name = req.body.name as string;

	if (!chatId) {
		return res.status(400).json({ error: 'Chat ID is required' });
	}

	const updatedChat = await updateChatName(chatId, name);

	if (!updatedChat) {
		return res.status(404).json({ error: 'Chat not updated' });
	}

	res.json(updatedChat);
});

export const deleteChatController = handleRequest(async (req: Request, res: Response) => {
	const chatId = req.params.id;

	if (!chatId) {
		return res.status(400).json({ error: 'Chat ID is required' });
	}

	await deleteChat(chatId);

	res.json(200);
});