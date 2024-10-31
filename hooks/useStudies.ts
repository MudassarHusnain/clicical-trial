import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Study {
  id: string;
  name: string;
  noOfDays: number;
  noOfRates: number;
}

const fetchStudies = async (clerkId: string): Promise<Study[]> => {
  const { data } = await axios.get(`/api/studies?clerkId=${clerkId}`);
  return data.studies;
};

export const useStudies = (clerkId: string) => {
  return useQuery({
    queryKey: ['studies', clerkId],
    queryFn: () => fetchStudies(clerkId),
    enabled: !!clerkId, // Ensures the query only runs if clerkId is defined
  });
};
