import {NextFunction, Request, Response, Router} from 'express';
import { authenticateToken } from '@/middleware';
import { getUserMe } from "@/controllers/account";

const router = Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
	await authenticateToken(req, res, next)
});

router.get('/me', async (req: Request, res: Response) => {
	await getUserMe(req, res)
});

export const accountRoutes = router;