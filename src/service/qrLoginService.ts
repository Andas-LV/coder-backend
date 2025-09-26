
import { prisma } from '@/lib/prisma';
import { QrLoginStatus } from '@prisma/client';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { sendMessage } from '@/ws';

export const generateQrCode = async () => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await prisma.qrLoginToken.create({
    data: {
      token,
      expiresAt,
    },
  });

  return { token };
};

export const approveQrCode = async (token: string, userId: string) => {
  const qrLoginToken = await prisma.qrLoginToken.findUnique({
    where: { token },
  });

  if (!qrLoginToken) {
    return { success: false, message: 'Invalid token' };
  }

  if (qrLoginToken.expiresAt < new Date()) {
    return { success: false, message: 'Token expired' };
  }

  if (qrLoginToken.status !== QrLoginStatus.PENDING) {
    return { success: false, message: 'Token already used' };
  }

  await prisma.qrLoginToken.update({
    where: { token },
    data: {
      status: QrLoginStatus.SCANNED,
      userId,
    },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });

  sendMessage(token, { type: 'login', user });

  return { success: true };
};
