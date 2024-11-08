import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get('groupId');

  if (!groupId) {
    return NextResponse.json({ error: 'Missing required parameter: groupId' }, { status: 400 });
  }

  try {
    const rates = await prisma.rate.findMany({
      where: { groupId: Number(groupId) },
    });

    return NextResponse.json({ rates }, { status: 200 });
  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json({ error: 'An error occurred while fetching rates' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

function generateDays(noOfDays: number) {
  return Array.from({ length: noOfDays }).map((_, dayIndex) => ({
    name: `Day${dayIndex + 1}`,
  }));
}

export async function POST(req: Request) {
  const { groupId } = await req.json();

  if (!groupId) {
    return NextResponse.json({ error: 'Missing required parameter: groupId' }, { status: 400 });
  }

  try {
    // Fetch the rates for the specified groupId
    const groupRates = await prisma.rate.findMany({
      where: { groupId: Number(groupId) },
    });

    if (groupRates.length === 0) {
      return NextResponse.json({ error: 'No rates found for the specified groupId' }, { status: 404 });
    }

    // Get the days associated with the first rate (if it exists)
    const rateId = groupRates[0].id;
    const ratedays = await prisma.day.findMany({
      where: { rateId },
    });

    // Calculate new count and rate name
    const newCount = groupRates.length + 1;
    const newRateName = `R${newCount}`;

    // Create a new rate with generated days
    const newRate = await prisma.rate.create({
      data: {
        groupId: Number(groupId),
        name: newRateName,
        days: {
          create: generateDays(ratedays.length),
        },
      },
    });

    return NextResponse.json({ newRate }, { status: 201 });
  } catch (error) {
    console.error('Error adding rate:', error);
    return NextResponse.json({ error: 'An error occurred while adding the rate' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const rateId = searchParams.get('rateId');

  if (!rateId) {
    return new Response("rateId is required", { status: 400 });
  }

  try {
    await prisma.rate.delete({
      where: {
        id: Number(rateId),
      },
    });
    
    return new Response("Rate and associated data deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting rate:", error);
    return new Response("Failed to delete rate", { status: 500 });
  }
}