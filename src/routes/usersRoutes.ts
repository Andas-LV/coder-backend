import {Request, Response, Router} from 'express';
import { createUserController } from "@/controllers/users";

const router = Router();

router.post('/sync', async (req: Request, res: Response) => {
	await createUserController(req, res)
});

export const usersRouter = router;