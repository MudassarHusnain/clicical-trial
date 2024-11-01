'use client'; // Ensure this file is treated as a client component

import { useParams } from 'next/navigation';
import RatesList from '@/components/RatesList';

const StudyPage: React.FC = () => {
  const {groupId} = useParams();
  console.log(groupId)
  // Check if studyId is available
  if (!groupId) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <RatesList groupId={Number(groupId)} /> {/* Pass the studyId to RatesList */}
    </div>
  );
};

export default StudyPage;
