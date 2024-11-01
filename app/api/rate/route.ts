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
