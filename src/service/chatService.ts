import { prisma } from '@/lib/prisma';
import { Provider } from '@prisma/client';

export async function createChat(userId: string, aiProvider: Provider) {
	const now = new Date();
	const dateForName = now.toLocaleString('default', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	try {
		return prisma.chat.create({
			data: {
				name: dateForName,
				aiProvider,
				author: {
					connect: { id: userId },
				},
			},
			select: {
				id: true,
				name: true,
				aiProvider: true,
				updatedAt: true,
			},
		});
	} catch (e) {
		console.error(e);
	}
}

export async function getUserChats(userId: string) {
	try {
		return await prisma.chat.findMany({
			where: {
				authorId: userId,
			},
			orderBy: {
				updatedAt: 'desc',
			},
			select: {
				id: true,
				name: true,
				aiProvider: true,
				updatedAt: true,
			},
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}

export async function getChatById(chatId: string) {
	try {
		return await prisma.chat.findUnique({
			where: {
				id: chatId,
			},
			include: {
				requests: {
					orderBy: {
						createdAt: 'asc',
					},
					select: {
						id: true,
						prompt: true,
						response: true,
						createdAt: true,
					},
				},
			},
		});
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function updateChatName(chatId: string, name: string) {
	try {
		return await prisma.chat.update({
			where: {
				id: chatId,
			},
			data: {
				name,
			},
		});
	} catch (error) {
		console.error('Ошибка при обновлении имени чата:', error);
		return null;
	}
}

export async function deleteChat(chatId: string) {
	try {
		return await prisma.chat.delete({
			where: {
				id: chatId,
			},
		});
	} catch (error) {
		console.error('Ошибка при удалении чата:', error);
		return null;
	}
}
