import { useState, useEffect } from 'react';
import { useRates } from '@/hooks/useRates'; // Make sure the path is correct
import { FiEdit, FiTrash } from 'react-icons/fi';
import Hierarchy from './Hierarchy';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
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

interface RatesListProps {
  groupId: number;
}

const RatesList: React.FC<RatesListProps> = ({ groupId }) => {
  const { data: rates = [], isLoading, error } = useRates(groupId);
  const [localRates, setLocalRates] = useState(rates);
  const { studyId } = useParams();

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState<number | null>(null);

  // Sync localRates with fetched rates data on initial load or when rates changes
  useEffect(() => {
    if (rates.length !== localRates.length) {
      setLocalRates(rates);
    }
  }, [rates]);

  const handleDeleteClick = (id: number) => {
    setSelectedRateId(id);
    setIsModalOpen(true); // Open the confirmation modal
  };

  const deleteRate = async () => {
    if (!selectedRateId) return;

    try {
      const response = await axios.delete(`/api/rate?rateId=${selectedRateId}`);

      if (response.status === 200) {
        // Show success toast when status is 200
        toast.success(`Rate with id ${selectedRateId} deleted successfully!`);
        setLocalRates(localRates.filter((rate) => rate.id !== selectedRateId)); // Remove the rate from local state
      } else {
        toast.error('Failed to delete rate.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the rate.');
      console.error('Error deleting rate:', error);
    } finally {
      setIsModalOpen(false); // Close the modal after operation
    }
  };

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

  if (isLoading) return <div className="text-center mt-20">Loading rates...</div>;
  if (error) return <div className="text-center mt-20">Error loading rates.</div>;

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
                    onClick={() => handleDeleteClick(rate.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
                <Link
                href={`/study/${studyId}/group/${groupId}/rate/${rate.id}/day`}
                className="flex flex-col h-full"
              >
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={deleteRate}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RatesList;
