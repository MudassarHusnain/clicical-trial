// components/DataCard.tsx
import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface DataCardProps {
  title: string;
  data: Record<string, any>;
  onEdit: () => void;
}

const DataCard: React.FC<DataCardProps> = ({ title, data, onEdit }) => {
  // Select key fields to display
  const displayFields = Object.entries(data).slice(0, 3); // Show first 3 fields for brevity
  console.log(`DataCard: ${data.key}`)
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <ul className="text-sm text-gray-600">
          {displayFields.map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize">{key}:</span> {String(value)}
            </li>
          ))}
        </ul>
      </div>
      <FaEdit onClick={onEdit} className="cursor-pointer text-blue-500" />
    </div>
  );
};

export default DataCard;
