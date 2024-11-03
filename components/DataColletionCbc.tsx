// components/DataCollectionCbcForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DataCollectionCbcForm: React.FC = () => {
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

  const handleSubmit = async () => {
    try {
      // Add API call here to submit form data
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
