import OpenAI from 'openai';
import config from './index';

export const deepSeekAi = new OpenAI({
	baseURL: config.deepSeek_api,
	apiKey: config.deepSeek_api_key,
});

export const deepSeekModel = "deepseek-chat";