import { Request, Response } from 'express';
import { AiRequest } from '@/types/Ai';
import { deepSeekReqService } from '@/service/deepseekService';
import { saveAiRequest } from '@/service/requestService';
import { Provider } from '@prisma/client';

export async function deepSeekReqController(req: Request, res: Response) {
	try {
		const { prompt, chatId } = req.body as AiRequest;

		if (!prompt || !chatId) {
			return res.status(400).json({ error: 'Prompt and Chat ID are required' });
		}

		const result = await deepSeekReqService({ prompt, chatId });

		if (!result) {
			return res.status(502).json({ error: 'AI model failed to respond' });
		}

		await saveAiRequest(chatId, prompt, result.result, Provider.deepseek);

		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
