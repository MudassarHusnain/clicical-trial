import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Day {
  id: number;
  name: string;
  rateId: number;
  createdAt: string;
  updatedAt: string;
}

const fetchDays = async (rateId: number): Promise<Day[]> => {
  const { data } = await axios.get(`/api/day?rateId=${rateId}`);
  return data.days;
};

export const useDays = (rateId: number) => {
  return useQuery<Day[], Error>({
    queryKey: ['days', rateId],
    queryFn: () => fetchDays(rateId),
    enabled: !!rateId, // Ensures the query only runs if groupId is defined
  });
};
