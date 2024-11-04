// components/AnimalAssessmentForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateAnimalAssessment } from '@/hooks/useAnimalAssessment'; // Import the hook for API calls
import { useParams } from 'next/navigation'; // To access the dayId parameter

const AnimalAssessmentForm: React.FC = () => {
  const { dayId } = useParams(); // Get dayId from URL parameters
  const [weight, setWeight] = useState<number | ''>('');
  const [lps, setLps] = useState<number | ''>('');
  const [detamine, setDetamine] = useState<number | ''>('');

  const { mutate: createAssessment, isMutating } = useCreateAnimalAssessment(); // Use the mutation hook

  const handleSubmit = async () => {
    if (!dayId) {
      toast.error('Day ID is missing.');
      return;
    }

    try {
      await createAssessment(
        { weight: Number(weight), lps: Number(lps), detamine: Number(detamine), dayId: Number(dayId) },
        {
          onSuccess: () => {
            toast.success('Animal Assessment data submitted successfully!');
            // Reset form fields
            setWeight('');
            setLps('');
            setDetamine('');
          },
          onError: () => {
            toast.error('Failed to submit Animal Assessment data');
          },
        }
      );
    } catch (error) {
      toast.error('Failed to submit Animal Assessment data');
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Weight</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter weight"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">LPS</label>
        <input
          type="number"
          value={lps}
          onChange={(e) => setLps(parseFloat(e.target.value) || '')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter LPS value"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Detamine</label>
        <input
          type="number"
          value={detamine}
          onChange={(e) => setDetamine(parseFloat(e.target.value) || '')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Detamine value"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isMutating}
        className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${
          isMutating ? 'opacity-50 cursor-not-allowed' : ''
        }`}>
        {isMutating ? 'Submitting...' : 'Submit Animal Assessment'}
      </button>
    </div>
  );
};

export default AnimalAssessmentForm;
