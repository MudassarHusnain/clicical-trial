'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useCreateActivity } from '@/hooks/useActivity';

const ActivityForm: React.FC = () => {
    const { dayId } = useParams();
    const [comments, setComments] = useState<string>('');
    
    const { mutate: createActivity, isMutating } = useCreateActivity();

    const handleSubmit = () => {
        if (!dayId) {
            toast.error("Day ID is missing.");
            return;
        }

        createActivity(
            { comments, dayId: Number(dayId) },
            {
                onSuccess: () => {
                    toast.success('Activity data submitted successfully!');
                    setComments('');
                },
                onError: () => {
                    toast.error('Failed to submit activity data');
                }
            }
        );
    };

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Comments</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none max-h-32 overflow-auto"
                    placeholder="Enter your comments here..."
                    rows={4}
                    required
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={isMutating}
                className={`w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg 
                    ${isMutating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'} 
                    transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
                {isMutating ? 'Submitting...' : 'Submit Activity'}
            </button>
        </div>
    );
};

export default ActivityForm;
