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
    });

    return NextResponse.json({ days }, { status: 200 });
  } catch (error) {
    console.error('Error fetching days:', error);
    return NextResponse.json({ error: 'An error occurred while fetching days' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
