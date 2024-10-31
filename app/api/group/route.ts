// pages/api/studies/[studyId]/groups.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { studyId } = req.query;

  if (!studyId) {
    return res.status(400).json({ error: 'Missing required parameter: studyId' });
  }

  try {
    const groups = await prisma.group.findMany({
      where: {
        studyId: Number(studyId),
      },
      select: {
        id: true,
        name: true,
      },
    });

    return res.status(200).json({ groups });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return res.status(500).json({ error: 'An error occurred while fetching groups' });
  } finally {
    await prisma.$disconnect();
  }
}
