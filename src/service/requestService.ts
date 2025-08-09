import { prisma } from '@/lib/prisma';
import { Provider } from '@prisma/client';

export async function saveAiRequest(chatId: string, prompt: string, response: string, aiProvider: Provider) {
	const chat = await prisma.chat.findUnique({
		where: { id: chatId },
		select: { aiProvider: true },
	});

	if (!chat) {
		throw new Error('Chat not found');
	}

	if (chat.aiProvider !== aiProvider) {
		throw new Error(`Mismatched provider: expected ${chat.aiProvider}, got ${aiProvider}`);
	}

	return prisma.request.create({
		data: {
			prompt,
			response,
			chat: { connect: { id: chatId } },
		},
	});
}
