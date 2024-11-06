// components/EditDataCollectionEsrForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation'; // Assuming you're using Next.js router
import { useDataCollectionEsr, useUpdateDataCollectionEsr } from '@/hooks/useDataCollectionEsr';

interface EditDataCollectionEsrFormProps {
  editData?: { id: number; results: number; refValue: number }; // Shape of the editData
  closeModal: () => void; // Function to close the modal
}

const EditDataCollectionEsrForm: React.FC<EditDataCollectionEsrFormProps> = ({ editData, closeModal }) => {
  const { dayId } = useParams(); // Extract the dayId from the URL parameters
  const { mutate: updateDataCollection, isLoading: isUpdating } = useUpdateDataCollectionEsr(); // Mutation hook for update

  const [results, setResults] = useState<number | ''>('');
  const [refValue, setRefValue] = useState<number | ''>('');

  // Set the initial form values based on editData if it exists
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

    if (results === '' || refValue === '') {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      updateDataCollection(
        {
          id: editData?.id || 0,
          results: Number(results),
          refValue: Number(refValue),
          dayId: Number(dayId),
        },
        {
          onSuccess: () => {
            toast.success('Data Collection - ESR updated successfully!');
            setResults(''); // Clear form fields after successful submission
            setRefValue('');
            closeModal(); // Close the modal on successful submission
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
          onChange={(e) => setResults(e.target.value === '' ? '' : parseFloat(e.target.value))}
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
          onChange={(e) => setRefValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter reference value"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isUpdating}
        className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isUpdating ? 'Submitting...' : 'Submit ESR Data'}
      </button>
    </div>
  );
};

export default EditDataCollectionEsrForm;
