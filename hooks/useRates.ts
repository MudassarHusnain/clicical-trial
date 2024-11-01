import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Rate {
  id: number;
  name: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
}

const fetchRates = async (groupId: number): Promise<Rate[]> => {
  const { data } = await axios.get(`/api/rate?groupId=${groupId}`);
  return data.rates;
};

export const useRates = (groupId: number) => {
  return useQuery<Rate[], Error>({
    queryKey: ['rates', groupId],
    queryFn: () => fetchRates(groupId),
    enabled: !!groupId, // Ensures the query only runs if groupId is defined
  });
};
