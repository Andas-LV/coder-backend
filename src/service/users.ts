import { Prisma } from '@prisma/client';
import { TUser } from '@/types/User';
import { prisma } from '@/lib/prisma';


export async function saveUser(data: TUser): Promise<TUser> {
	try {
		return await prisma.user.create({
			data: {
				id: data.id,
				provider: data.provider,
				providerId: data.providerId,
				email: data.email,
				name: data.name,
				image: data.image,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			select: {
				id: true,
				provider: true,
				providerId: true,
				email: true,
				name: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [
						{ id: data.id },
						{ provider: data.provider, providerId: data.providerId },
					],
				},
				select: {
					id: true,
					provider: true,
					providerId: true,
					email: true,
					name: true,
					image: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			if (existingUser) {
				return existingUser;
			}
			throw new Error('User not found after P2002 error');
		}
		throw error;
	}
}
