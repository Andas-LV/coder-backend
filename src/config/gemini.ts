import { GoogleGenAI } from '@google/genai';
import config from './index';

export const geminiAi = new GoogleGenAI({ apiKey: config.gemini_api_key });

export const geminiModel = "gemini-1.5-flash";