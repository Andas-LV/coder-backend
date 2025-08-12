import dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

interface Config {
	port: number;
	nodeEnv: string;
	origins: string[];
	localhost: string;
	nextAuthSecret: string;
	deepSeek_api: string;
	deepSeek_api_key: string;
	gemini_api_key: string;
}

const config: Config = {
	port: Number(process.env.PORT) || 8000,
	nodeEnv: process.env.NODE_ENV || 'development',
	origins: [
		process.env.CLIENT_URL || 'https://coder-front.vercel.app',
		'http://localhost:3000',
	],
	localhost: process.env.LOCALHOST || 'http://127.0.0.1:8000',
	nextAuthSecret:
		process.env.NEXTAUTH_SECRET ||
		'O/7OG8x3dlmW4dEU1yT/OBz5yKfq0KN2hmNHUPH8XSM=',
	deepSeek_api: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
	deepSeek_api_key:
		process.env.DEEPSEEK_API_KEY || 'sk-5152973e795b46f48eabcb99beabad58',
	gemini_api_key:
		process.env.GEMIN_API_KEY || 'AIzaSyBUlchyiOCRoX7gh_jyDuUHGaI2e2HWb1E',
};

export default config;
