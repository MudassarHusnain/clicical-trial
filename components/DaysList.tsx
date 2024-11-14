'use client';

import { useDays } from '@/hooks/useDays'; // Ensure the path is correct
import { FiEdit, FiTrash } from 'react-icons/fi';
import Hierarchy from './Hierarchy';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


// Modal Component
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this rate?</h3>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


interface DaysListProps {
  rateId: number;
}

const DaysList: React.FC<DaysListProps> = ({ rateId }) => {
  const { studyId, groupId } = useParams();
  const { data: days = [], isLoading, error } = useDays(rateId);

  // Initialize state with empty array
  const [localDays, setLocalDays] = useState<any[]>([]);

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);

  // Sync localRates with fetched rates data on initial load or when rates changes
  useEffect(() => {
    if (days.length !== localDays.length) {
      setLocalDays(days);
    }
  }, [days]);

  // Synchronize localDays with days data when it changes
  useEffect(() => {
    if (days && days.length > 0) {
      setLocalDays(days); // Update localDays when days changes
    }
  }, [days]);

  if (isLoading) return <div className="text-center mt-20">Loading days...</div>;
  if (error) return <div className="text-center mt-20">Error loading days.</div>;

  const createDay = async () => {
    try {
      const response = await axios.post(`/api/day`, { rateId: Number(rateId) });
      const newRate = response.data.day;
      // Update localDays with the new rate
      setLocalDays((prevDays: any) => [...prevDays, newRate]);

      // Show success toast
      toast.success('Day created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error creating day:', error);

      // Show error toast
      toast.error('Error creating day.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
      });
    }
  };
  const handleDeleteClick = (id: number) => {
    setSelectedDayId(id)
    setIsModalOpen(true); // Open the confirmation modal
  };

  const deleteDay = async () => {
    if (!selectedDayId) return;

    try {
      const response = await axios.delete(`/api/day?dayId=${selectedDayId}`);

      if (response.status === 200) {
        // Show success toast when status is 200
        toast.success(`Day with id ${selectedDayId} deleted successfully!`);
        setLocalDays(localDays.filter((day) => day.id !== selectedDayId)); // Remove the rate from local state
      } else {
        toast.error('Failed to delete day.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the day.');
      console.error('Error deleting day:', error);
    } finally {
      setIsModalOpen(false); // Close the modal after operation
    }
  };

  return (
    <div className="mt-20 px-4">
      <Hierarchy />

      <h1 className="text-3xl font-bold mb-6 text-center">Days</h1>
      <div className="mb-20">
        <button
          onClick={createDay}
          className="bg-blue-500 w-36 h-10 hover:bg-blue-600 flex items-center justify-center float-end rounded-md text-white"
        >
          Add Day
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {localDays.length > 0 ? (
          localDays.map((day) => (
            <div
              key={day.id}
              className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200 transition-transform transform hover:scale-105"
            >
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
                  onClick={() => handleDeleteClick(day.id)}

                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FiTrash size={20} />
                </button>
              </div>
              <Link href={`/study/${studyId}/group/${groupId}/rate/${rateId}/day/${day.id}/data`} className="flex flex-col h-full">

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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={deleteDay}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DaysList;
