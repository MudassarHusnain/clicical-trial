/*
  Warnings:

  - You are about to drop the column `name` on the `AnimalAssessmentDataRate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DataCollectionCbcRate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DataCollectionEsrRate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnimalAssessmentDataRate" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "DataCollectionCbcRate" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "DataCollectionEsrRate" DROP COLUMN "name";
