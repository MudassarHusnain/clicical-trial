// components/DaysList.tsx
'use client';

import { useDays } from '@/hooks/useDays'; // Ensure the path is correct
import { FiEdit, FiTrash } from 'react-icons/fi';
import Hierarchy from './Hierarchy';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface DaysListProps {
  rateId: number;
}

const DaysList: React.FC<DaysListProps> = ({ rateId }) => {
  const { studyId, groupId } = useParams();

  const { data: days = [], isLoading, error } = useDays(rateId);

  if (isLoading) return <div className="text-center mt-20">Loading days...</div>;
  if (error) return <div className="text-center mt-20">Error loading days.</div>;

  return (
    <div className="mt-20 px-4">
      <Hierarchy />
      
      <h1 className="text-3xl font-bold mb-6 text-center">Days</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.length > 0 ? (
          days.map((day) => (
            <div
              key={day.id}
              className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200 transition-transform transform hover:scale-105" // Add hover effect
            >
              <Link href={`/study/${studyId}/group/${groupId}/rate/${rateId}/day/${day.id}/data`} className="flex flex-col h-full">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Link navigation
                      console.log(`Edit day with id: ${day.id}`); // Implement edit logic
                    }}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Link navigation
                      console.log(`Delete day with id: ${day.id}`); // Implement delete logic
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{day.name}</h2>
                <p className="text-gray-600">Created At: {new Date(day.createdAt).toLocaleString()}</p>
                <p className="text-gray-600">Updated At: {new Date(day.updatedAt).toLocaleString()}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No days available for this rate.
          </p>
        )}
      </div>
    </div>
  );
};

export default DaysList;
