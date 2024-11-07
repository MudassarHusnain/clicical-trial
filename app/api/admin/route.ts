import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {

   try{
    const studies = await prisma.study.findMany({
        include: {
            groups:{
                include: {
                    rates: {
                        include: {
                            days : {
                                include: {
                                    activityRates: true,
                                    animalAssessmentData:true,
                                    dataCollectionCbcRate: true,
                                    dataCollectionEsrRate: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return NextResponse.json({
        message: 'day created successfully',
        studies: studies,
      });
} catch (error) {
    console.error('Error creating day:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while creating the day' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}