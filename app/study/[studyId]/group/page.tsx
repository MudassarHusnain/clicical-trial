// app/studies/[studyId]/page.tsx
'use client'; // Ensure this file is treated as a client component

import { useParams } from 'next/navigation';
import GroupsList from '@/components/GroupsList';

const StudyPage: React.FC = () => {
  const {studyId} = useParams();
  console.log(studyId)
  
  // Check if studyId is available
  if (!studyId) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <GroupsList studyId={Number(studyId)} /> {/* Pass the studyId to GroupsList */}
    </div>
  );
};

export default StudyPage;
