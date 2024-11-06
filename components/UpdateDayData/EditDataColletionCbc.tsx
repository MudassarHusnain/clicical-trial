'use client';

import React, { useState } from 'react';
import { useUpdateDataCollectionCbc } from '@/hooks/useDataCollectionCbc'; // Import the hook
import { toast } from 'react-toastify';

interface EditDataCollectionCbcFormProps {
  editData: {
    id: string;
    rbc: number;
    pcv: number;
    plt: number;
    wbc: number;
    neutrophil: number;
    lymphocyte: number;
    eosinophil: number;
    basophil: number;
    monocyte: number;
    mcv: number;
    mch: number;
    mchc: number;
  };
  closeModal: () => void;
}

const EditDataCollectionCbcForm: React.FC<EditDataCollectionCbcFormProps> = ({ editData, closeModal }) => {
  const [rbc, setRbc] = useState<number>(editData.rbc);
  const [pcv, setPcv] = useState<number>(editData.pcv);
  const [plt, setPlt] = useState<number>(editData.plt);
  const [wbc, setWbc] = useState<number>(editData.wbc);
  const [neutrophil, setNeutrophil] = useState<number>(editData.neutrophil);
  const [lymphocyte, setLymphocyte] = useState<number>(editData.lymphocyte);
  const [eosinophil, setEosinophil] = useState<number>(editData.eosinophil);
  const [basophil, setBasophil] = useState<number>(editData.basophil);
  const [monocyte, setMonocyte] = useState<number>(editData.monocyte);
  const [mcv, setMcv] = useState<number>(editData.mcv);
  const [mch, setMch] = useState<number>(editData.mch);
  const [mchc, setMchc] = useState<number>(editData.mchc);

  const { mutate: updateDataCollectionCbc, isLoading } = useUpdateDataCollectionCbc();

  const handleSubmit = () => {
    if (!editData.id) {
      toast.error('No data ID provided');
      return;
    }

    // Prepare the payload
    const payload = {
      id: editData.id,
      rbc,
      pcv,
      plt,
      wbc,
      neutrophil,
      lymphocyte,
      eosinophil,
      basophil,
      monocyte,
      mcv,
      mch,
      mchc,
    };

    // Corrected mutation call
    updateDataCollectionCbc(payload, {
      onSuccess: () => {
        toast.success('Data Collection CBC updated successfully!');
        closeModal(); // Close the modal on success
      },
      onError: (error) => {
        console.error('Error during update:', error);
        toast.error('Failed to submit Data Collection CBC data');
      },
    });
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-h-[500px] overflow-scroll h-full">
      <div className="space-y-4">
        {/* CBC fields */}
        {[
          { label: 'RBC', value: rbc, setValue: setRbc },
          { label: 'PCV', value: pcv, setValue: setPcv },
          { label: 'PLT', value: plt, setValue: setPlt },
          { label: 'WBC', value: wbc, setValue: setWbc },
          { label: 'Neutrophil', value: neutrophil, setValue: setNeutrophil },
          { label: 'Lymphocyte', value: lymphocyte, setValue: setLymphocyte },
          { label: 'Eosinophil', value: eosinophil, setValue: setEosinophil },
          { label: 'Basophil', value: basophil, setValue: setBasophil },
          { label: 'Monocyte', value: monocyte, setValue: setMonocyte },
          { label: 'MCV', value: mcv, setValue: setMcv },
          { label: 'MCH', value: mch, setValue: setMch },
          { label: 'MCHC', value: mchc, setValue: setMchc },
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.setValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              placeholder={`Enter ${field.label}`}
              required
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full bg-yellow-500 text-white font-bold py-2 px-4 mt-6 rounded-lg hover:bg-yellow-600 transition duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Updating...' : 'Update CBC Data'}
      </button>
    </div>
  );
};

export default EditDataCollectionCbcForm;
