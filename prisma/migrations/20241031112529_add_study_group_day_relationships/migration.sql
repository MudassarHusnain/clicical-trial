-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "noOfDays" INTEGER NOT NULL,
    "noOfRates" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clerkId" TEXT NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studyId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataCollectionEsrRate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "results" DOUBLE PRECISION NOT NULL,
    "refValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "DataCollectionEsrRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalAssessmentDataRate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "lps" DOUBLE PRECISION NOT NULL,
    "detamine" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "AnimalAssessmentDataRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataCollectionCbcRate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parametersRefValue" INTEGER NOT NULL,
    "rbc" DOUBLE PRECISION NOT NULL,
    "pcv" DOUBLE PRECISION NOT NULL,
    "plt" DOUBLE PRECISION NOT NULL,
    "wbc" DOUBLE PRECISION NOT NULL,
    "neutrophil" DOUBLE PRECISION NOT NULL,
    "lymphocyte" DOUBLE PRECISION NOT NULL,
    "eosinophil" DOUBLE PRECISION NOT NULL,
    "basophil" DOUBLE PRECISION NOT NULL,
    "monocyte" DOUBLE PRECISION NOT NULL,
    "mcv" DOUBLE PRECISION NOT NULL,
    "mch" DOUBLE PRECISION NOT NULL,
    "mchc" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "DataCollectionCbcRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityRate" (
    "id" SERIAL NOT NULL,
    "comments" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "ActivityRate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataCollectionEsrRate" ADD CONSTRAINT "DataCollectionEsrRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalAssessmentDataRate" ADD CONSTRAINT "AnimalAssessmentDataRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataCollectionCbcRate" ADD CONSTRAINT "DataCollectionCbcRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRate" ADD CONSTRAINT "ActivityRate_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;