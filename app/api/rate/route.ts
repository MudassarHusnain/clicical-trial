import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

function generateDays(noOfDays: number) {
  return Array.from({ length: noOfDays }).map((_, dayIndex) => ({
    name: `Day${dayIndex + 1}`,
  }));
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get('groupId');

  if (!groupId) {
    return NextResponse.json({ error: 'Missing required parameter: groupId' }, { status: 400 });
  }

  try {
    // Fetch only the rate data for the specified groupId
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


export async function POST(req: Request) {
  const {groupId} = await req.json();

  if (!groupId) {
    return NextResponse.json({ error: 'Missing required parameter: groupId' }, { status: 400 });
  }

  try {
    // Fetch the current rate count for the specified groupId
    const groupRates = await prisma.rate.findMany({
      where: { groupId: Number(groupId) },
    });
    const ratedays = await prisma.day.findMany({
      where: { rateId: Number(groupRates[0].id) },
    });
    console.log(ratedays.length);
    if (groupRates.length === 0) {
      return NextResponse.json({ error: 'No rates found for the specified groupId' }, { status: 404 });
    }

    // Increment the count for the group
    const currentCount = groupRates.length;  // Or use any logic to derive the current count
    const newCount = currentCount + 1;
    
    // Create a new rate with the name 'Rcount' and the incremented count
    const newRate = await prisma.rate.create({
      data: {
        groupId: Number(groupId),
        name: `R${newCount}`,
        days: {
          create: generateDays(ratedays.length)
        }
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