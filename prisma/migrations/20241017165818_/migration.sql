/*
  Warnings:

  - Added the required column `health` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rate" ADD COLUMN     "health" TEXT NOT NULL;
