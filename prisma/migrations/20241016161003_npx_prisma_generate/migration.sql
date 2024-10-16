/*
  Warnings:

  - You are about to drop the `RatData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RatData" DROP CONSTRAINT "RatData_userId_fkey";

-- DropTable
DROP TABLE "RatData";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Rate" (
    "id" SERIAL NOT NULL,
    "ratAge" INTEGER NOT NULL,
    "ratWeight" DOUBLE PRECISION NOT NULL,
    "ratTemp" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clerkId" TEXT NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);
