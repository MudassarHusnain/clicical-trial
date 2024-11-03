// components/DataCollectionEsrForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DataCollectionEsrForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [esrValue, setEsrValue] = useState<number | ''>('');

  const handleSubmit = async () => {
    try {
      // Add API call here to submit form data
      toast.success('Data Collection - ESR submitted successfully!');
      // Reset form fields
      setName('');
      setEsrValue('');
    } catch (error) {
      toast.error('Failed to submit ESR data');
    }
  };

  return (
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">ESR Value</label>
          <input
            type="number"
            value={esrValue}
            onChange={(e) => setEsrValue(parseFloat(e.target.value) || '')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter ESR value"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
          Submit ESR Data
        </button>
      </div>
  );
};

export default DataCollectionEsrForm;
