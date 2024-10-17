'use client';

import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Page() {
  const { userId } = useAuth(); // Clerk auth
  const [ratAge, setRatAge] = useState<number | ''>('');
  const [ratWeight, setRatWeight] = useState<number | ''>('');
  const [ratTemp, setRatTemp] = useState<number | ''>('');
  const [health, setHealth] = useState<string>('');

  const sendRateData = async () => {
    try {
      const response = await axios.post('/api/addTrial', {
        clerkId: userId,
        ratAge,
        ratWeight,
        ratTemp,
        health,
      });
      console.log(response.data);
      toast.success('Data is added successfully')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Trial
        </h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rat Age</label>
          <input
            type="number"
            value={ratAge}
            onChange={(e) => setRatAge(parseInt(e.target.value) || '')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Rat Age"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rat Weight (g)</label>
          <input
            type="number"
            value={ratWeight}
            onChange={(e) => setRatWeight(parseFloat(e.target.value) || '')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Rat Weight"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rat Temperature (°C)</label>
          <input
            type="number"
            value={ratTemp}
            onChange={(e) => setRatTemp(parseFloat(e.target.value) || '')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Rat Temperature"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Health Status</label>
          <input
            type="text"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Health Status"
          />
        </div>

        <button
          onClick={sendRateData}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Submit Trial
        </button>
      </div>
    </div>
  );
}

export default Page;
