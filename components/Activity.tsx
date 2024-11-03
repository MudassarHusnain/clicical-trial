// components/ActivityForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ActivityForm: React.FC = () => {
  const [comments, setComments] = useState<string>('');

  const handleSubmit = async () => {
    try {
      // Add API call here to submit form data
      toast.success('Activity data submitted successfully!');
      // Reset form fields
      setComments('');
    } catch (error) {
      toast.error('Failed to submit activity data');
    }
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
        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Submit Activity
      </button>
    </div>
  );
};

export default ActivityForm;
