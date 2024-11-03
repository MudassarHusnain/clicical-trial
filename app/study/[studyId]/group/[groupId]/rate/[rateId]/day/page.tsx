'use client'; // Ensure this file is treated as a client component

import { useParams } from 'next/navigation';
import DaysList from '@/components/DaysList';

const StudyPage: React.FC = () => {
  const {rateId} = useParams();
  console.log(rateId)
  // Check if studyId is available
  if (!rateId) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <DaysList rateId={Number(rateId)} /> {/* Pass the studyId to RatesList */}
    </div>
  );
};

export default StudyPage;
