import { AiResponse, AiRequest } from '@/types/Ai';
import { llamaClient, llamaModel } from '@/config/llama';

export async function llamaReqService({
	prompt,
}: AiRequest): Promise<AiResponse> {
	try {
		const result = await llamaClient.chat.completions.create({
			messages: [{ role: 'user', content: prompt }],
			model: llamaModel,
			temperature: 1,
			max_completion_tokens: 1024,
			top_p: 1,
			stream: false,
			stop: null,
		});

		const text = result.choices[0]?.message?.content;

		if (text) {
			return { result: text };
		} else {
			throw new Error('Не удалось извлечь текст из ответа LLaMA.');
		}
	} catch (error: any) {
		throw new Error(`LLaMA API error: ${error.message || 'Unknown error'}`);
	}
}
