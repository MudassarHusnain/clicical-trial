'use client';

import { useState, useEffect } from 'react';
import { useRates } from '@/hooks/useRates'; // Make sure the path is correct
import { FiEdit, FiTrash } from 'react-icons/fi';
import Hierarchy from './Hierarchy';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

interface RatesListProps {
  groupId: number;
}

const RatesList: React.FC<RatesListProps> = ({ groupId }) => {
  const { data: rates = [], isLoading, error } = useRates(groupId);
  const [localRates, setLocalRates] = useState(rates); 
  const { studyId } = useParams();

  // Sync localRates with fetched rates data on initial load or when rates changes
  useEffect(() => {
    if (rates.length !== localRates.length) {
      setLocalRates(rates);
    }
  }, [rates]);
  

  if (isLoading) return <div className="text-center mt-20">Loading rates...</div>;
  if (error) return <div className="text-center mt-20">Error loading rates.</div>;

  const createRate = async () => {
    try {
      const response = await axios.post(`/api/rate`, { groupId: Number(groupId) });
      const newRate = response.data.newRate;

      // Update localRates with the new rate
      setLocalRates((prevRates) => [...prevRates, newRate]);

      // Show success toast
      toast.success('Rate created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error creating rate:', error);

      // Show error toast
      toast.error('Error creating rate.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="mt-20 px-4">
      <Hierarchy />

      <h1 className="text-3xl font-bold mb-6 text-center">Rates</h1>
      <div className="mb-20">
        <button
          onClick={createRate}
          className="bg-blue-500 w-36 h-10 hover:bg-blue-600 flex items-center justify-center float-end rounded-md text-white"
        >
          Add Rate
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {localRates.length > 0 ? (
          localRates.map((rate) => (
            <div
              key={rate.id}
              className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200 transition-transform transform hover:scale-105"
            >
              <Link
                href={`/study/${studyId}/group/${groupId}/rate/${rate.id}/day`}
                className="flex flex-col h-full"
              >
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Link navigation
                      console.log(`Edit rate with id: ${rate.id}`);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Link navigation
                      console.log(`Delete rate with id: ${rate.id}`);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{rate.name}</h2>
                <p className="text-gray-600">Created At: {new Date(rate.createdAt).toLocaleString()}</p>
                <p className="text-gray-600">Updated At: {new Date(rate.updatedAt).toLocaleString()}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No rates available for this group.
          </p>
        )}
      </div>
    </div>
  );
};

export default RatesList;
