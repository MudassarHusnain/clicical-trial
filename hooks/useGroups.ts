// hooks/useGroups.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Group {
  id: string;
  name: string;
}

const fetchGroups = async (studyId: string): Promise<Group[]> => {
  const { data } = await axios.get(`/api/group/${studyId}`);
  return data.groups;
};

export const useGroups = (studyId: string) => {
  return useQuery({
    queryKey: ['groups', studyId],
    queryFn: () => fetchGroups(studyId),
    enabled: !!studyId, // Ensures the query only runs if studyId and clerkId are defined
  });
};
