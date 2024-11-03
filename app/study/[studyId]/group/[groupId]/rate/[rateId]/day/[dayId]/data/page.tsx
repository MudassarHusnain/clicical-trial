// components/DashboardButtons.tsx
'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import Hierarchy from '@/components/Hierarchy';
import AnimalAssessmentForm from '@/components/AnimalAssessment';
import DataCollectionEsrForm from '@/components/DataCollectionEsr';
import DataCollectionCbcForm from '@/components/DataColletionCbc';
import ActivityForm from '@/components/Activity';

const DashboardButtons: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (formType: string) => {
    setActiveForm(formType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveForm(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-20">
      <Hierarchy />
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-4 justify-center items-center">
        <button
          onClick={() => openModal('AnimalAssessment')}
          className="bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all"
        >
          Animal Assessment Data
        </button>
        <button
          onClick={() => openModal('DataCollectionEsr')}
          className="bg-green-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-all"
        >
          Data Collection - ESR
        </button>
        <button
          onClick={() => openModal('DataCollectionCbc')}
          className="bg-yellow-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition-all"
        >
          Data Collection - CBC
        </button>
        <button
          onClick={() => openModal('Activity')}
          className="bg-purple-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none transition-all"
        >
          Activity
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          activeForm === 'AnimalAssessment'
            ? 'Animal Assessment Data'
            : activeForm === 'DataCollectionEsr'
            ? 'Data Collection - ESR'
            : activeForm === 'DataCollectionCbc'
            ? 'Data Collection - CBC'
            : 'Activity'
        }
      >
        {activeForm === 'AnimalAssessment' && <AnimalAssessmentForm />}
        {activeForm === 'DataCollectionEsr' && <DataCollectionEsrForm />}
        {activeForm === 'DataCollectionCbc' && <DataCollectionCbcForm />}
        {activeForm === 'Activity' && <ActivityForm />}
      </Modal>
    </div>
  );
};

export default DashboardButtons;
