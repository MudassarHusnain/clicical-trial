// hooks/useGroups.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Group {
  id: string;
  name: string;
  studyId: number;
}

const fetchGroups = async (studyId: Number): Promise<Group[]> => {
  const { data } = await axios.get(`/api/group?studyId=${studyId}`);
  console.log(data)
  return data.groups;
};

export const useGroups = (studyId: Number) => {
  return useQuery({
    queryKey: ['groups', studyId],
    queryFn: () => fetchGroups(studyId),
    enabled: !!studyId, // Ensures the query only runs if studyId and clerkId are defined
  });
};
