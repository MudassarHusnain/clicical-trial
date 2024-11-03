'use client';

import { useRates } from '@/hooks/useRates'; // Make sure the path is correct
import { FiEdit, FiTrash } from 'react-icons/fi';
import Hierarchy from './Hierarchy';
import Link from 'next/link';
import { useParams } from 'next/navigation';
interface RatesListProps {
  groupId: number;
}

const RatesList: React.FC<RatesListProps> = ({ groupId }) => {
  const { data: rates = [], isLoading, error } = useRates(groupId);
  const {studyId} = useParams() ;
  if (isLoading) return <div>Loading rates...</div>;
  if (error) return <div>Error loading rates.</div>;
  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Rates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Hierarchy />

        {rates.length > 0 ? (
          rates.map((rate) => (
            <div
              key={rate.id}
              className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200"
            >
              <Link href={`/study/${studyId}/group/${groupId}/rate/${rate.id}/day`}>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => console.log(`Edit rate with id: ${rate.id}`)} // Implement edit logic
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => console.log(`Delete rate with id: ${rate.id}`)} // Implement delete logic
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
