/*
  Warnings:

  - Added the required column `provider` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('gemini', 'deepseek', 'chatgpt', 'claude', 'llama');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "provider" "Provider" NOT NULL;
