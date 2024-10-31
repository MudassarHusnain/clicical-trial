import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Helper function to generate Days
function generateDays(noOfDays: number) {
  return Array.from({ length: noOfDays }).map((_, dayIndex) => ({
    name: `Day${dayIndex + 1}`,
  }));
}

// Helper function to generate Rates with Days
function generateRates(noOfRates: number, noOfDays: number) {
  return Array.from({ length: noOfRates }).map((_, rateIndex) => ({
    name: `R${rateIndex + 1}`,
    days: {
      create: generateDays(noOfDays),
    },
  }));
}

// Helper function to generate Groups with Rates and Days
function generateGroups(noOfRates: number, noOfDays: number) {
  const groupNames = [
    "Group1 (Experimental)",
    "Group2 (Positive Control)",
    "Group3 (Negative Control)",
  ];

  return groupNames.map((groupName) => ({
    name: groupName,
    rates: {
      create: generateRates(noOfRates, noOfDays),
    },
  }));
}

export async function POST(req: Request) {
  try {
    const { clerkId, name, noOfDays, noOfRates } = await req.json();

    // Validate input
    if (!clerkId || !name || !noOfDays || !noOfRates) {
      return NextResponse.json(
        { error: 'Missing required fields: clerkId, name, noOfDays, noOfRates' },
        { status: 400 }
      );
    }

    // Create the study with nested groups, rates, and days
    const newStudy = await prisma.study.create({
      data: {
        clerkId,
        name,
        noOfDays,
        noOfRates,
        groups: {
          create: generateGroups(noOfRates, noOfDays),
        },
      },
    });

    return NextResponse.json({
      message: 'Study with groups, rates, and days created successfully',
      study: newStudy,
    });
  } catch (error) {
    console.error('Error creating study:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while creating the study' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get('clerkId');

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Missing required parameter: clerkId' },
        { status: 400 }
      );
    }

    // Fetch studies associated with the specific clerkId
    const studies = await prisma.study.findMany({
      where: { clerkId },
    });

    return NextResponse.json({
      message: 'Studies fetched successfully',
      studies,
    });
  } catch (error) {
    console.error('Error fetching studies:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while fetching studies' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}