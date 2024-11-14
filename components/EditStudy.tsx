'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

interface Study {
    id: number;
    name: string;
}

const EditStudyForm: React.FC<{ study: Study }> = ({ study }) => {
  const { push } = useRouter();
  const [name, setName] = useState<string>(study.name);

  const sendStudyData = async () => {
    try {
      const response = await axios.put(`/api/studies?studyId=${study.id}`, {
        id: study.id,
        name,
      });
      console.log(response.data);
      toast.success('Study updated successfully!');
      
      // Redirect after successful update
      push('/study');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update study');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Study
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

        <button
          onClick={sendStudyData}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Update Study
        </button>
      </div>
    </div>
  );
}

export default EditStudyForm;
