import { Request, Response, Router } from 'express';
import { generateQrCode, approveQrCode } from '@/controllers/qrLoginController';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	await generateQrCode(req, res)
});

router.post('/approve', async (req: Request, res: Response) => {
	await approveQrCode(req, res)
});

export const qrLoginRouter = router;
