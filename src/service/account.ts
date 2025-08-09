import { prisma } from '@/lib/prisma';

export async function fetchUserMe(userId: string) {
	try {
		return prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				name: true,
				image: true,
				provider: true,
				providerId: true,
				updatedAt: true
			}
		});
	} catch (e) {
		console.error(e);
	}
}