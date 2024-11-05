// components/DashboardButtons.tsx
'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import Hierarchy from '@/components/Hierarchy';
import AnimalAssessmentForm from '@/components/AnimalAssessment';
import DataCollectionEsrForm from '@/components/DataCollectionEsr';
import DataCollectionCbcForm from '@/components/DataColletionCbc';
import ActivityForm from '@/components/Activity';
import EditAnimalAssessmentForm from '@/components/UpdateDayData/EditAnimalAssessment';
import EditDataCollectionEsrForm from '@/components/UpdateDayData/EditDataCollectionEsr';
import EditDataCollectionCbcForm from '@/components/UpdateDayData/EditDataColletionCbc';
import EditActivityForm from '@/components/UpdateDayData/EditActivity';
import DataCard from '@/components/DataCard';
import { useActivities } from '@/hooks/useActivity';
import { useDataCollectionEsr } from '@/hooks/useDataCollectionEsr';
import { useDataCollectionCbc } from '@/hooks/useDataCollectionCbc';
import { useAnimalAssessments } from '@/hooks/useAnimalAssessment';
import { useParams } from 'next/navigation';

const DashboardButtons: React.FC = () => {
  const { dayId } = useParams();
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
   
  // Fetch records for each table
  const { data: animalAssessmentData } = useAnimalAssessments(Number(dayId));
  const { data: dataCollectionEsr } = useDataCollectionEsr(Number(dayId));
  const { data: dataCollectionCbc } = useDataCollectionCbc(Number(dayId));
  const { data: activityData } = useActivities(Number(dayId));

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
      
      {/* Buttons Section */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-4 justify-center items-center">
        
        {/* Animal Assessment Data Button */}
        <button
          onClick={() => animalAssessmentData ? null : openModal('AnimalAssessment')}
          className="bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all"
        >
          {animalAssessmentData ? 'Animal Assessment Data Available' : 'Add Animal Assessment Data'}
        </button>

        {/* Data Collection - ESR Button */}
        <button
          onClick={() => dataCollectionEsr ? null : openModal('DataCollectionEsr')}
          className="bg-green-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-all"
        >
          {dataCollectionEsr ? 'Data Collection - ESR Available' : 'Add Data Collection - ESR'}
        </button>

        {/* Data Collection - CBC Button */}
        <button
          onClick={() => dataCollectionCbc ? null : openModal('DataCollectionCbc')}
          className="bg-yellow-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition-all"
        >
          {dataCollectionCbc ? 'Data Collection - CBC Available' : 'Add Data Collection - CBC'}
        </button>

        {/* Activity Button */}
        <button
          onClick={() => activityData ? null : openModal('Activity')}
          className="bg-purple-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none transition-all"
        >
          {activityData ? 'Activity Available' : 'Add Activity'}
        </button>
      </div>

      {/* Cards Section */}
      <div className="mt-8 flex flex-col gap-4 p-4">
        {animalAssessmentData && (
          <DataCard
            title="Animal Assessment Data"
            data={animalAssessmentData}
            onEdit={() => openModal('AnimalAssessment', animalAssessmentData)}
          />
        )}
        {dataCollectionEsr && (
          <DataCard
            title="Data Collection - ESR"
            data={dataCollectionEsr}
            onEdit={() => openModal('DataCollectionEsr', dataCollectionEsr)}
          />
        )}
        {dataCollectionCbc && (
          <DataCard
            title="Data Collection - CBC"
            data={dataCollectionCbc}
            onEdit={() => openModal('DataCollectionCbc', dataCollectionCbc)}
          />
        )}
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
        <div>
          {activeForm === 'AnimalAssessment' && (
            editData ? <EditAnimalAssessmentForm editData={editData} /> : <AnimalAssessmentForm />
          )}
          {activeForm === 'DataCollectionEsr' && (
            editData ? <EditDataCollectionEsrForm editData={editData} /> : <DataCollectionEsrForm />
          )}
          {activeForm === 'DataCollectionCbc' && (
            editData ? <EditDataCollectionCbcForm editData={editData} /> : <DataCollectionCbcForm />
          )}
          {activeForm === 'Activity' && (
            editData ? <EditActivityForm editData={editData} /> : <ActivityForm />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DashboardButtons;
