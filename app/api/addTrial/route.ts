// app/api/addTrial/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { clerkId, ratAge, ratWeight, ratTemp, health } = await req.json();

    const newRate = await prisma.rate.create({
      data: {
        ratAge,
        ratWeight,
        ratTemp,
        health,
        clerkId,
      },
    });

    return NextResponse.json(newRate);
  } catch (error) {
    console.error('Error creating rate:', error);
    return NextResponse.json({ message: 'Failed to create rate' }, { status: 500 });
  }
}
