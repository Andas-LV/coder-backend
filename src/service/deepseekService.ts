import { AiResponse, AiRequest } from '@/types/Ai';
import { deepSeekAi, deepSeekModel } from '@/config/deepseek';

export async function deepSeekReqService({
	prompt,
}: AiRequest): Promise<AiResponse> {
	try {
		const result = await deepSeekAi.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: deepSeekModel,
		});

		const text = result.choices[0].message.content

		if (text) {
			return { result: text };
		} else {
			throw new Error('Не удалось извлечь текст из ответа DeepSeek.');
		}
	} catch (error: any) {
		throw new Error(`DeepSeek API error: ${error.message || 'Unknown error'}`);
	}
}