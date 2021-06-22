/*
  Warnings:

  - You are about to drop the column `blocked` on the `Follows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Follows" DROP COLUMN "blocked";

-- CreateTable
CREATE TABLE "Blocked" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "blockedId" INTEGER,

    PRIMARY KEY ("id")
);
