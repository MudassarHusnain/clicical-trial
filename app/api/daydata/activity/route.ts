import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
      const { comments,dayId } = await req.json();

      const newDay = await prisma.activityRate.create({
        data: {
            comments,
            dayId,
        },
      });
  
      return NextResponse.json({
        message: 'Study with groups, rates, and days created successfully',
        study: newDay,
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
      const {searchParams} = new URL(req.url);
      const dayId = searchParams.get('dayId')
      
      if (!dayId) {
        return NextResponse.json(
          { error: 'Missing required parameter: clerkId' },
          { status: 400 }
        );
      }
      const newStudy = await prisma.activityRate.findMany({
        where: { dayId: Number(dayId) },
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