'use client';

import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const StudyForm: React.FC = () => {
  const { userId } = useAuth(); // Clerk auth
  const [name, setName] = useState<string>('');
  const [noOfDays, setNoOfDays] = useState<number | ''>('');
  const [noOfRates, setNoOfRates] = useState<number | ''>('');

  const sendStudyData = async () => {
    try {
      const response = await axios.post('/api/studies', {
        clerkId: userId,
        name,
        noOfDays,
        noOfRates,
      });
      console.log(response.data);
      toast.success('Study added successfully!');
      // Reset the form
      setName('');
      setNoOfDays('');
      setNoOfRates('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add study');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Study
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Study Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Study Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days</label>
          <input
            type="number"
            value={noOfDays}
            onChange={(e) => setNoOfDays(parseInt(e.target.value) || '')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Number of Days"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Number of Rates</label>
          <input
            type="number"
            value={noOfRates}
            onChange={(e) => setNoOfRates(parseInt(e.target.value) || '')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Number of Rates"
            required
          />
        </div>

        <button
          onClick={sendStudyData}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Submit Study
        </button>
      </div>
    </div>
  );
}

export default StudyForm;
