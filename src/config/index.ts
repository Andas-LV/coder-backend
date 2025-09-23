
interface IConfig {
	groq_api_key: string;
	deepSeek_api_key: string;
	deepSeek_api: string;
	gemini_api_key: string;
	origins: string;
	port: string;
	localhost: string;
	nextAuthSecret: string;
	nodeEnv: string;
}

const config: IConfig = {
	origins: "*",
	port: process.env.PORT!,
	localhost: process.env.LOCALHOST!,
	nodeEnv: process.env.NODE_ENV!,
	nextAuthSecret: process.env.NEXTAUTH_SECRET!,
  groq_api_key: process.env.GROQ_API_KEY!,
  deepSeek_api_key: process.env.DEEPSEEK_API_KEY!,
  deepSeek_api: process.env.DEEPSEEK_API!,
	gemini_api_key: process.env.AIzaSyBUlchyiOCRoX7gh_jyDuUHGaI2e2HWb1E!,
};

export default config;