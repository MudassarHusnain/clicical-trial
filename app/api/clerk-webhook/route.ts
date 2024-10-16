// pages/api/clerk-webhook.ts

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Helper function to verify the Clerk webhook
const verifyClerkWebhook = (req: NextApiRequest) => {
    const signature = req.headers['clerk-signature'];
    const body = req.body;

    // TODO: Implement Clerk's webhook signature verification here.
    // Use Clerk's SDK or official documentation to verify the webhook.
    // Clerk documentation: https://clerk.dev/docs/reference/webhooks

    return true; // For now, assuming the webhook is verified
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Verify the Clerk webhook (optional but recommended)
        if (!verifyClerkWebhook(req)) {
            return res.status(400).json({ error: 'Invalid Clerk webhook signature' });
        }

        const { id, email_addresses, first_name, last_name } = req.body.data;

        // Check if the user already exists in the local database
        const existingUser = await prisma.user.findUnique({
            where: { clerkId: id },
        });

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists in the local database' });
        }

        // Create a new user in the local database
        const newUser = await prisma.user.create({
            data: {
                clerkId: id,
                email: email_addresses[0].email_address, // Primary email address
                name: `${first_name || ''} ${last_name || ''}`,
            },
        });

        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error storing user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
