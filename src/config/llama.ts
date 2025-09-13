import { Groq } from 'groq-sdk';
import config from './index';

export const llamaClient = new Groq({
	apiKey: config.groq_api_key,
});

export const llamaModel = 'meta-llama/llama-4-scout-17b-16e-instruct';
