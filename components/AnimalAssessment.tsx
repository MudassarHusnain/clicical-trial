// components/AnimalAssessmentForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AnimalAssessmentForm: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [lps, setLps] = useState<number | ''>('');
  const [detamine, setDetamine] = useState<number | ''>('');

  const handleSubmit = async () => {
    try {
      // Add API call here to submit form data
      toast.success('Animal Assessment data submitted successfully!');
      // Reset form fields
      setWeight('');
      setLps('');
      setDetamine('');
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
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Submit Animal Assessment
        </button>
      </div>
  );
};

export default AnimalAssessmentForm;
