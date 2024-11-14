'use client';

import { useAuth } from '@clerk/nextjs';
import { useStudies } from '@/hooks/useStudies';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Link from 'next/link';
import EditStudyForm from '@/components/EditStudy';
import { useState } from 'react';

function Page() {
  const { userId } = useAuth();
  const clerkId = userId || '';
  const { data: studies, isLoading, error } = useStudies(clerkId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);

  const handleEdit = (study: any) => {
    setSelectedStudy(study); // Set the selected study data
    setIsEditModalOpen(true); // Open the modal
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting study with id: ${id}`);
    // Implement delete logic here
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudy(null);
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20">Error loading studies data</div>;

  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Studies Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies && studies.length > 0 ? (
          studies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200 transition-transform transform hover:scale-105"
            >
             
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(study);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(study.id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
                <Link
                href={`/study/${study.id}/group`}
                className="block hover:text-blue-800 transition-colors duration-200 h-full"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{study.name}</h2>
                <p className="text-gray-600">
                  <strong>Days:</strong> {study.noOfDays}
                </p>
                <p className="text-gray-600">
                  <strong>Rates:</strong> {study.noOfRates}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No studies data available for this user.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedStudy && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
            <EditStudyForm study={selectedStudy} />
            <button onClick={closeModal} className="mt-4 text-red-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
