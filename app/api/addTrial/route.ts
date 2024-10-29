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

export async function GET(req: Request) {
  try {
    // Parse the request URL to get the clerkId from the query parameters
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get('clerkId');
    console.log(clerkId)
    // Check if clerkId is provided
    if (!clerkId) {
      return NextResponse.json({ message: 'clerkId is required' }, { status: 400 });
    }

    // Fetch all records from the database for the given clerkId
    const rates = await prisma.rate.findMany({
      where: { clerkId },
    });
    console.log(rates)

    return NextResponse.json(rates);
  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json({ message: 'Failed to fetch rates' }, { status: 500 });
  }
}