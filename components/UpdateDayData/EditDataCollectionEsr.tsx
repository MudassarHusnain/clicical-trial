// components/DataCollectionEsrForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCreateDataCollectionEsr } from '@/hooks/useDataCollectionEsr'; // Import the hook
import { useParams } from 'next/navigation'; // To access the dayId parameter

// Define the type for editData
interface EditData {
  results: number;
  refValue: number;
}

interface DataCollectionEsrFormProps {
  editData?: EditData; // Optional prop
}

const EditDataCollectionEsrForm: React.FC<DataCollectionEsrFormProps> = ({ editData }) => {
  const { dayId } = useParams(); // Get dayId from URL parameters
  const [results, setResults] = useState<number | ''>('');
  const [refValue, setRefValue] = useState<number | ''>(0); // You might want to set a default or allow it to be empty

  const { mutate: createDataCollection, isLoading } = useCreateDataCollectionEsr(); // Use the mutation hook

  // Effect to populate form fields when editData is provided
  useEffect(() => {
    if (editData) {
      setResults(editData.results);
      setRefValue(editData.refValue);
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!dayId) {
      toast.error('Day ID is missing.');
      return;
    }

    try {
      await createDataCollection(
        { 
          results: Number(results), 
          refValue: Number(refValue), // Add refValue to the payload
          dayId: Number(dayId) 
        },
        {
          onSuccess: () => {
            toast.success('Data Collection - ESR submitted successfully!');
            // Reset form fields
            setResults('');
            setRefValue(0); // Reset refValue to its default state
          },
          onError: () => {
            toast.error('Failed to submit ESR data');
          },
        }
      );
    } catch (error) {
      toast.error('Failed to submit ESR data');
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Results</label>
        <input
          type="number"
          value={results}
          onChange={(e) => setResults(parseFloat(e.target.value) || '')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter results"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Reference Value</label>
        <input
          type="number"
          value={refValue}
          onChange={(e) => setRefValue(parseFloat(e.target.value) || '')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter reference value"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}>
        {isLoading ? 'Submitting...' : 'Submit ESR Data'}
      </button>
    </div>
  );
};

export default EditDataCollectionEsrForm;
