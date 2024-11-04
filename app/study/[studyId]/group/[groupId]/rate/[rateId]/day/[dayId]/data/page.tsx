// components/DashboardButtons.tsx
'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import Hierarchy from '@/components/Hierarchy';
import AnimalAssessmentForm from '@/components/AnimalAssessment';
import DataCollectionEsrForm from '@/components/DataCollectionEsr';
import DataCollectionCbcForm from '@/components/DataColletionCbc';
import ActivityForm from '@/components/Activity';
import DataCard from '@/components/DataCard';
import { useActivities} from '@/hooks/useActivity';
import { useDataCollectionEsr } from '@/hooks/useDataCollectionEsr';
// import { useDataCollectionCbc } from '@/hooks/useDataHooks';
import { useAnimalAssessments } from '@/hooks/useAnimalAssessment';
import { useParams } from 'next/navigation';
const DashboardButtons: React.FC = () => {
  const {dayId} = useParams();
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch records for each table
  const { data: animalAssessmentData } = useAnimalAssessments(dayId);
  const { data: dataCollectionEsr } = useDataCollectionEsr(dayId);
  // const { data: dataCollectionCbc } = useDataCollectionCbc(dayId);
  const { data: activityData } = useActivities(dayId);

  const openModal = (formType: string, record: any = null) => {
    setActiveForm(formType);
    setEditData(record); // Pass data if editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveForm(null);
    setEditData(null); // Reset edit data
    setIsModalOpen(false);
  };

  return (
    <div className="mt-20">
      <Hierarchy />
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-4 justify-center items-center">

        {/* Animal Assessment Data Button */}
        <button
          onClick={() => animalAssessmentData ? null : openModal('AnimalAssessment')}
          className="bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all"
        >
          {animalAssessmentData ? 'Animal Assessment Data Available' : 'Add Animal Assessment Data'}
        </button>
        {animalAssessmentData && (
          <DataCard
            title="Animal Assessment Data"
            data={animalAssessmentData}
            onEdit={() => openModal('AnimalAssessment', animalAssessmentData)}
          />
        )}

        {/* Data Collection - ESR Button */}
        <button
          onClick={() => dataCollectionEsr ? null : openModal('DataCollectionEsr')}
          className="bg-green-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-all"
        >
          {dataCollectionEsr ? 'Data Collection - ESR Available' : 'Add Data Collection - ESR'}
        </button>
        {dataCollectionEsr && (
          <DataCard
            title="Data Collection - ESR"
            data={dataCollectionEsr}
            onEdit={() => openModal('DataCollectionEsr', dataCollectionEsr)}
          />
        )}

        {/* Data Collection - CBC Button */}
        {/* <button
          onClick={() => dataCollectionCbc ? null : openModal('DataCollectionCbc')}
          className="bg-yellow-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition-all"
        >
          {dataCollectionCbc ? 'Data Collection - CBC Available' : 'Add Data Collection - CBC'}
        </button>
        {dataCollectionCbc && (
          <DataCard
            title="Data Collection - CBC"
            data={dataCollectionCbc}
            onEdit={() => openModal('DataCollectionCbc', dataCollectionCbc)}
          />
        )} */}

        {/* Activity Button */}
        <button
          onClick={() => activityData ? null : openModal('Activity')}
          className="bg-purple-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none transition-all"
        >
          {activityData ? 'Activity Available' : 'Add Activity'}
        </button>
        {activityData && (
          <DataCard
            title="Activity"
            data={activityData}
            onEdit={() => openModal('Activity', activityData)}
          />
        )}
      </div>

      {/* Modal for editing or adding new data */}
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
        {activeForm === 'DataCollectionCbc' && <DataCollectionCbcForm  />}
        {activeForm === 'Activity' && <ActivityForm  />}
      </Modal>
    </div>
  );
};

export default DashboardButtons;
