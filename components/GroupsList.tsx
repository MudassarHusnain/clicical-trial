'use client';

import React from 'react'; // Import React here
import { useGroups } from '@/hooks/useGroups';
import RatesList from '@/components/RatesList'; // Import the RatesList component
import { FiEdit, FiTrash } from 'react-icons/fi';
import Link from 'next/link';
import Hierarchy from '@/components/Hierarchy';

interface Group {
  id: string;
  name: string;
}

interface GroupsListProps {
  studyId: number;
}

const GroupsList: React.FC<GroupsListProps> = ({ studyId }) => {
  const { data: groups = [], isLoading, error } = useGroups(studyId);
  const ids = {
    studyId: String(studyId)
  }
  if (isLoading) return <div>Loading groups...</div>;
  if (error) return <div>Error loading groups.</div>;

  return (
    <div className="mt-20 px-4">

      <h1 className="text-3xl font-bold mb-6 text-center">Groups</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Hierarchy />

        {groups.length > 0 ? (
          groups.map((group: Group) => (
            <div
              key={group.id}
              className={`bg-white rounded-lg shadow-md p-6 relative border border-gray-200`} // Change styles based on selection
            >
              <Link href={`/study/${studyId}/group/${group.id}/rate`}>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => console.log(`Edit group with id: ${group.id}`)} // Implement edit logic
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => console.log(`Delete group with id: ${group.id}`)} // Implement delete logic
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{group.name}</h2>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No groups available for this study.
          </p>
        )}
      </div>

    </div>
  );
};

export default GroupsList;
