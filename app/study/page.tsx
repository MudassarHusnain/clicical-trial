'use client';
import { useAuth } from '@clerk/nextjs';
import { useStudies } from '@/hooks/useStudies';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Link from 'next/link';

function Page() {
  const { userId } = useAuth();
  const clerkId = userId || '';

  const { data: studies, isLoading, error } = useStudies(clerkId);

  const handleEdit = (id: string) => {
    // Implement edit logic here
    console.log(`Editing study with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete logic here
    console.log(`Deleting study with id: ${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading studies data</div>;

  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Studies Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies && studies.length > 0 ? (
          studies.map((study) => (
            <Link
              href={`/study/${study.id}/group`}
              className=" hover:text-blue-800  transition-colors duration-200"
            >
              <div
                key={study.id}
                className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200"
              >
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(study.id)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(study.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">

                  {study.name}
                </h2>
                <p className="text-gray-600">
                  <strong>Days:</strong> {study.noOfDays}
                </p>
                <p className="text-gray-600">
                  <strong>Rates:</strong> {study.noOfRates}
                </p>
              </div>
            </Link>

          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No studies data available for this user.
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
