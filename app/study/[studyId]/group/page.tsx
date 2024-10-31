// app/studies/[studyId]/page.tsx
'use client'; // Ensure this file is treated as a client component

import { usePathname } from 'next/navigation';
import GroupsList from '@/components/GroupsList';

const StudyPage: React.FC = () => {
  const pathname = usePathname();
  const studyId = pathname.split('/').pop(); // Extract the studyId from the pathname

  // Check if studyId is available
  if (!studyId) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <GroupsList studyId={studyId} /> {/* Pass the studyId to GroupsList */}
    </div>
  );
};

export default StudyPage;
