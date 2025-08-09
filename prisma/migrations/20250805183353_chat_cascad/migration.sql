-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_chatId_fkey";

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
