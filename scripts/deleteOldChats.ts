import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function deleteOldChats() {
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

	const deleted = await prisma.chat.deleteMany({
		where: {
			updatedAt: {
				lt: sevenDaysAgo
			}
		}
	});

	console.log(`Удалено чатов: ${deleted.count}`);
}

deleteOldChats()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
