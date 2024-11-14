// pages/api/daydata/dataCollectionEsr.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req: Request) {
    try {
        const {
            parametersRefValue,
            rbc,
            pcv,
            plt,
            wbc,
            neutrophil,
            lymphocyte,
            eosinophil,
            basophil,
            monocyte,
            mcv,
            mch,
            mchc,
            dayId } = await req.json();

        // Create a new DataCollectionEsr entry
        const newDataCollectionCbc = await prisma.dataCollectionCbcRate.create({
            data: {
                parametersRefValue,
                rbc,
                pcv,
                plt,
                wbc,
                neutrophil,
                lymphocyte,
                eosinophil,
                basophil,
                monocyte,
                mcv,
                mch,
                mchc,
                dayId
            },
        });

        return NextResponse.json({
            message: 'Data Collection Cbc created successfully',
            dataCollectionEsr: newDataCollectionCbc,
        });
    } catch (error) {
        console.error('Error creating Data Collection Cbc:', error);
        return NextResponse.json(
            { error: 'An internal error occurred while creating the Data Collection Cbc' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// Handle GET requests
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dayId = searchParams.get('dayId');

        if (!dayId) {
            return NextResponse.json({ error: 'Day ID is required' }, { status: 400 });
        }

        const dataCollectionCbc = await prisma.dataCollectionCbcRate.findFirst({
            where: {
                dayId: Number(dayId),
            },
            orderBy:{
                id: 'asc'
              }
        });

        return NextResponse.json({
            message: 'Data Collection Cbc retrieved successfully',
            dataCollectionCbc,
        });
    } catch (error) {
        console.error('Error retrieving Data Collection Cbc:', error);
        return NextResponse.json(
            { error: 'An internal error occurred while retrieving Data Collection Cbc' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


export async function PUT(req: Request) {
    try {
        const {
            id,
            parametersRefValue,
            rbc,
            pcv,
            plt,
            wbc,
            neutrophil,
            lymphocyte,
            eosinophil,
            basophil,
            monocyte,
            mcv,
            mch,
            mchc,
            dayId
        } = await req.json();

        const updatedDataCollectionCbc = await prisma.dataCollectionCbcRate.update({
            where: { id },
            data: {
                parametersRefValue,
                rbc,
                pcv,
                plt,
                wbc,
                neutrophil,
                lymphocyte,
                eosinophil,
                basophil,
                monocyte,
                mcv,
                mch,
                mchc,
                dayId
            },
        });

        return NextResponse.json({
            message: 'Data Collection Cbc updated successfully',
            dataCollectionCbc: updatedDataCollectionCbc,
        });
    } catch (error) {
        console.error('Error updating Data Collection Cbc:', error);
        return NextResponse.json(
            { error: 'An internal error occurred while updating the Data Collection Cbc' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}