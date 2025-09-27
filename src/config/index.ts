interface IConfig {
	origins: string[];
	groq_api_key: string;
	deepSeek_api_key: string;
	deepSeek_api: string;
	gemini_api_key: string;
	port: string;
	localhost: string;
	nextAuthSecret: string;
	nodeEnv: string;
}

const config: IConfig = {
	origins: [
		process.env.CLIENT_URL!,
		process.env.LOCAL_CLIENT_URL!,
	],
	port: process.env.PORT!,
	localhost: process.env.LOCALHOST!,
	nodeEnv: process.env.NODE_ENV!,
	nextAuthSecret: process.env.NEXTAUTH_SECRET!,
	groq_api_key: process.env.GROQ_API_KEY!,
	deepSeek_api_key: process.env.DEEPSEEK_API_KEY!,
	deepSeek_api: process.env.DEEPSEEK_BASE_URL!,
	gemini_api_key: process.env.GEMINI_API_KEY!,
};

export default config;
