// components/DataCollectionCbcForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateDataCollectionCbc } from '../hooks/useDataCollectionCbc'; // Adjust import as necessary
import { useParams } from 'next/navigation'; // To access the dayId parameter
interface DATACOLLECTIONCBC{
  closeModal: () => void;

}
const DataCollectionCbcForm: React.FC<DATACOLLECTIONCBC> = ({closeModal}) => {
  const {dayId} = useParams()
  const [rbc, setRbc] = useState<number | ''>('');
  const [pcv, setPcv] = useState<number | ''>('');
  const [plt, setPlt] = useState<number | ''>('');
  const [wbc, setWbc] = useState<number | ''>('');
  const [neutrophil, setNeutrophil] = useState<number | ''>('');
  const [lymphocyte, setLymphocyte] = useState<number | ''>('');
  const [eosinophil, setEosinophil] = useState<number | ''>('');
  const [basophil, setBasophil] = useState<number | ''>('');
  const [monocyte, setMonocyte] = useState<number | ''>('');
  const [mcv, setMcv] = useState<number | ''>('');
  const [mch, setMch] = useState<number | ''>('');
  const [mchc, setMchc] = useState<number | ''>('');
  const [parametersRefValue, setParametersRefValue] = useState<number>(0); // example field

  const createDataCollectionCbc = useCreateDataCollectionCbc();

  const handleSubmit = async () => {
    try {
      // Make sure required fields are provided
      if (!dayId) {
        toast.error('Day ID is required');
        return;
      }

      // Trigger the mutation to create a new Data Collection CBC entry
      await createDataCollectionCbc.mutateAsync({
        parametersRefValue,
        rbc: rbc as number,
        pcv: pcv as number,
        plt: plt as number,
        wbc: wbc as number,
        neutrophil: neutrophil as number,
        lymphocyte: lymphocyte as number,
        eosinophil: eosinophil as number,
        basophil: basophil as number,
        monocyte: monocyte as number,
        mcv: mcv as number,
        mch: mch as number,
        mchc: mchc as number,
        dayId: Number(dayId),
      });

      toast.success('Data Collection - CBC submitted successfully!');
      
      // Reset form fields
      setRbc('');
      setPcv('');
      setPlt('');
      setWbc('');
      setNeutrophil('');
      setLymphocyte('');
      setEosinophil('');
      setBasophil('');
      setMonocyte('');
      setMcv('');
      setMch('');
      setMchc('');
      closeModal();
    } catch (error) {
      toast.error('Failed to submit CBC data');
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-h-[500px] overflow-scroll h-full">
      <div className="space-y-4">
        {/* CBC fields */}
        {[{ label: 'RBC', value: rbc, setValue: setRbc },
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
          { label: 'MCHC', value: mchc, setValue: setMchc }
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.setValue(parseFloat(e.target.value) || '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              placeholder={`Enter ${field.label}`}
              required
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-yellow-500 text-white font-bold py-2 px-4 mt-6 rounded-lg hover:bg-yellow-600 transition duration-200">
        Submit CBC Data
      </button>
    </div>
  );
};

export default DataCollectionCbcForm;
