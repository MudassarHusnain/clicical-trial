// pages/api/daydata/dataCollectionEsr.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req: Request) {
  try {
    const { results, refValue, dayId } = await req.json();

    // Create a new DataCollectionEsr entry
    const newDataCollectionEsr = await prisma.dataCollectionEsrRate.create({
      data: {
        results,
        refValue,
        dayId,
      },
    });

    return NextResponse.json({
      message: 'Data Collection ESR created successfully',
      dataCollectionEsr: newDataCollectionEsr,
    });
  } catch (error) {
    console.error('Error creating Data Collection ESR:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while creating the Data Collection ESR' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Handle GET requests
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dayId = searchParams.get('dayId');

    // Check if dayId is provided
    if (!dayId) {
      return NextResponse.json({ error: 'Day ID is required' }, { status: 400 });
    }

    // Retrieve DataCollectionEsr entries for the specified dayId
    const dataCollectionEsr = await prisma.dataCollectionEsrRate.findFirst({
      where: {
        dayId: Number(dayId),
      },
    });

    return NextResponse.json({
      message: 'Data Collection ESR retrieved successfully',
      dataCollectionEsr,
    });
  } catch (error) {
    console.error('Error retrieving Data Collection ESR:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while retrieving Data Collection ESR' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
