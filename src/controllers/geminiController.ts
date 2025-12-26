import { Request, Response } from 'express';
import { AiRequest } from '@/types/Ai';
import { geminiReqService } from '@/service/geminiService';
import { saveAiRequest } from '@/service/requestService';
import { Provider } from '@prisma/client';

export async function geminiReqController(req: Request, res: Response) {
	try {
		const { prompt, chatId } = req.body as AiRequest;

		if (!prompt || !chatId) {
			return res.status(400).json({ error: 'Prompt and Chat ID are required' });
		}

		const result = await geminiReqService({ prompt, chatId });

		if (!result) {
			return res.status(502).json({ error: 'AI model failed to respond' });
		}

		await saveAiRequest(chatId, prompt, result.result, Provider.gemini);

		res.status(200).json(result);
	} catch (error: any) {
		console.error('Gemini Controller Error:', error);
		res.status(500).json({
			error: 'Gemini request failed',
			details: error.message || 'Unknown error'
		});
	}
}
