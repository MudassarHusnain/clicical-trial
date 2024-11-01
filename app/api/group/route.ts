import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studyId = searchParams.get('studyId');

  if (!studyId) {
    return NextResponse.json({ error: 'Missing required parameter: studyId' }, { status: 400 });
  }

  try {
    const groups = await prisma.group.findMany({
      where: {
        studyId: Number(studyId),
      },
    });

    return NextResponse.json({ groups }, { status: 200 });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'An error occurred while fetching groups' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
