import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rateId = searchParams.get('rateId');

  if (!rateId) {
    return NextResponse.json({ error: 'Missing required parameter: rateId' }, { status: 400 });
  }

  try {
    // Fetch only the rate data for the specified groupId
    const days = await prisma.day.findMany({
      where: { rateId: Number(rateId) },
      orderBy:{
        id: 'asc'
      }
    });

    return NextResponse.json({ days }, { status: 200 });
  } catch (error) {
    console.error('Error fetching days:', error);
    return NextResponse.json({ error: 'An error occurred while fetching days' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// export async function DELETE(req: Request) {
//     const {rateId} = req.json();


// }

export async function POST(req: Request) {
  const { rateId } = await req.json();
  try {
    const ratedays = await prisma.day.findMany({
      where: {
        rateId: Number(rateId)
      }
    })

    const days = ratedays.length;
    const dayName = `Day${days + 1}`;

    const newDay = await prisma.day.create({
      data: {
        name: dayName,
        rateId: Number(rateId),
      }
    })

    return NextResponse.json({
      message: 'day created successfully',
      day: newDay,
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

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const dayId = searchParams.get('dayId');

  if (!dayId) {
    return new Response("dayId is required", { status: 400 });
  }

  try {
    await prisma.day.delete({
      where: {
        id: Number(dayId),
      },
      
    });
    
    return new Response("Day and associated data deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting day:", error);
    return new Response("Failed to delete day", { status: 500 });
  }
}