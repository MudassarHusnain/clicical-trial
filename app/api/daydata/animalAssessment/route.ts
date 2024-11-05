// pages/api/daydata/animalAssessment.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST method to create a new Animal Assessment
export async function POST(req: Request) {
    try {
        const { weight, lps, detamine, dayId } = await req.json();

        const newAssessment = await prisma.animalAssessmentDataRate.create({
            data: {
                weight,
                lps,
                detamine,
                dayId,
            },
        });

        return NextResponse.json({
            message: 'Animal assessment created successfully',
            assessment: newAssessment,
        });
    } catch (error) {
        console.error('Error creating animal assessment:', error);
        return NextResponse.json(
            { error: 'An internal error occurred while creating the assessment' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// GET method to fetch Animal Assessments based on dayId
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dayId = searchParams.get('dayId');

        const assessments = await prisma.animalAssessmentDataRate.findFirst({
            where: {
                dayId: Number(dayId), // Ensure dayId is a number
            },
        });

        return NextResponse.json({
            message: 'Animal assessments retrieved successfully',
            assessments,
        });
    } catch (error) {
        console.error('Error fetching animal assessments:', error);
        return NextResponse.json(
            { error: 'An internal error occurred while fetching assessments' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


export async function PUT(req: Request) {
  try {
    const { id, weight, lps, detamine, dayId } = await req.json();

    const animalAssessmentData = await prisma.animalAssessmentDataRate.update({
      where: { id: id },
      data: {
        weight,
        lps,
        detamine,
        dayId,
      },
    });

    return NextResponse.json({
      message: 'Animal assessment updated successfully',
      animalAssessmentData: animalAssessmentData,
    });
  } catch (error) {
    console.error('Error updating animal assessment:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while updating the assessment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
