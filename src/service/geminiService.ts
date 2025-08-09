import { AiRequest, AiResponse } from '@/types/Ai';
import { geminiAi, geminiModel } from '@/config/gemini';

export async function geminiReqService({
	prompt,
}: AiRequest): Promise<AiResponse> {
	try {
		const result = await geminiAi.models.generateContent({
			model: geminiModel,
			contents: [{ role: 'user', parts: [{ text: prompt }] }],
		});

		const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

		if (text) {
			return { result: text };
		} else {
			throw new Error('Не удалось извлечь текст из ответа Gemini.');
		}
	} catch (error: any) {
		throw new Error(`Gemini API error: ${error.message || 'Unknown error'}`);
	}
}