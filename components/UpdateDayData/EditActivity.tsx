import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useUpdateActivity } from '@/hooks/useActivity';

interface ActivityFormProps {
    editData?: { id: number; comments: string; dayId: number }; // Define the shape of the editData
    closeModal: () => void; // Define the closeModal function prop
}

const EditActivityForm: React.FC<ActivityFormProps> = ({ editData, closeModal }) => {
    const { dayId } = useParams();
    const [comments, setComments] = useState('');

    const { mutate: updatedActivity, isMutating } = useUpdateActivity();

    // Set initial state from editData if it exists
    useEffect(() => {
        if (editData) {
            setComments(editData.comments);
        }
    }, [editData]);

    const handleSubmit = () => {
        if (!dayId) {
            toast.error("Day ID is missing.");
            return;
        }

        updatedActivity(
            { id: editData?.id, comments, dayId: Number(dayId) }, // Include id here
            {
                onSuccess: () => {
                    toast.success('Activity data submitted successfully!');
                    setComments(''); // Clear comments or keep as is based on your preference
                    closeModal(); // Close the modal after submitting
                },
                onError: (error) => {
                    console.error('Error during update:', error);
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
                    onChange={(e) => setComments(e.target.value)} // Update state on change
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

export default EditActivityForm;
