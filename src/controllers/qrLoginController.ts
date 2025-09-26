import { Request, Response } from 'express';
import { generateQrCode as generateQrCodeService, approveQrCode as approveQrCodeService } from '@/service/qrLoginService';

export const generateQrCode = async (req: Request, res: Response) => {
  const { token } = await generateQrCodeService();
  res.json({ token });
};

export const approveQrCode = async (req: Request, res: Response) => {
  const { token, userId } = req.body;
  const result = await approveQrCodeService(token, userId);
  res.json(result);
};
