-- DropForeignKey
ALTER TABLE "ActivityRate" DROP CONSTRAINT "ActivityRate_dayId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalAssessmentDataRate" DROP CONSTRAINT "AnimalAssessmentDataRate_dayId_fkey";

-- DropForeignKey
ALTER TABLE "DataCollectionCbcRate" DROP CONSTRAINT "DataCollectionCbcRate_dayId_fkey";

-- DropForeignKey
ALTER TABLE "DataCollectionEsrRate" DROP CONSTRAINT "DataCollectionEsrRate_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_rateId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_groupId_fkey";

-- AlterTable
ALTER TABLE "ActivityRate" ALTER COLUMN "dayId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AnimalAssessmentDataRate" ALTER COLUMN "dayId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DataCollectionCbcRate" ALTER COLUMN "dayId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DataCollectionEsrRate" ALTER COLUMN "dayId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Day" ALTER COLUMN "rateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "studyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rate" ALTER COLUMN "groupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "Rate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataCollectionEsrRate" ADD CONSTRAINT "DataCollectionEsrRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalAssessmentDataRate" ADD CONSTRAINT "AnimalAssessmentDataRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataCollectionCbcRate" ADD CONSTRAINT "DataCollectionCbcRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRate" ADD CONSTRAINT "ActivityRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
