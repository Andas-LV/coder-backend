import {NextFunction, Request, Response, Router} from 'express';
import { authenticateToken } from '@/middleware';
import { geminiReqController } from "@/controllers/geminiController";
import { deepSeekReqController } from '@/controllers/deepseekController';

const router = Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
	await authenticateToken(req, res, next)
});

router.post('/gemini', async (req: Request, res: Response) => {
	await geminiReqController(req, res)
});

router.post('/deepSeek', async (req: Request, res: Response) => {
	await deepSeekReqController(req, res)
});

export const aiRoutes = router;