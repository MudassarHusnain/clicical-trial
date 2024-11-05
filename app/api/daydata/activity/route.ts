import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
      const { comments,dayId } = await req.json();

      const activityData = await prisma.activityRate.create({
        data: {
            comments,
            dayId,
        },
      });
  
      return NextResponse.json({
        message: 'Study with groups, rates, and days created successfully',
        activityData: activityData,
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
          { error: 'Missing required parameter: dayId' },
          { status: 400 }
        );
      }
      const activityData = await prisma.activityRate.findFirst({
        where: { dayId: Number(dayId) },
      });
  
      return NextResponse.json({
        message: 'Study with groups, rates, and days created successfully',
        activityData: activityData,
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


  export async function PUT(req: Request) {
    try {
      const { id, comments } = await req.json(); // Ensure you're also sending an 'id' in the request
  
      const activityData = await prisma.activityRate.update({
        where: {
          id: id, // Specify the unique identifier for the record you want to update
        },
        data: {
          comments,
        },
      });
  
      return NextResponse.json({
        message: 'Activity rate updated successfully',
        activityData: activityData,
      });
    } catch (error) {
      console.error('Error updating activity rate:', error);
      return NextResponse.json(
        { error: 'An internal error occurred while updating the activity rate' },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  