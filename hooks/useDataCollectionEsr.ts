import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface DataCollectionEsr {
  id: number;
  results: number;
  refValue: number;
  dayId: number;
}

// Fetch data collection for a specific day
const fetchDataCollectionEsr = async (dayId: number): Promise<DataCollectionEsr> => {
  const { data } = await axios.get(`/api/daydata/dataCollectionEsr?dayId=${dayId}`);
  return data.dataCollectionEsr; // Adjust based on your API response structure
};

// Query for data collection based on dayId
export const useDataCollectionEsr = (dayId: number) => {
  return useQuery<DataCollectionEsr, Error>({
    queryKey: ['dataCollectionEsr', dayId],
    queryFn: () => fetchDataCollectionEsr(dayId),
    enabled: !!dayId,
  });
};

// New data collection interface
interface NewDataCollectionEsr {
  results: number;
  refValue: number;
  dayId: number;
}

// API call to create a new data collection entry
const createDataCollectionEsr = async (newDataCollectionEsr: NewDataCollectionEsr): Promise<DataCollectionEsr> => {
  const { data } = await axios.post('/api/daydata/dataCollectionEsr', newDataCollectionEsr);
  return data; // Assuming the response is of type DataCollectionEsr
};

// Mutation hook for creating a new data collection
export const useCreateDataCollectionEsr = (): UseMutationResult<DataCollectionEsr, Error, NewDataCollectionEsr> => {
  return useMutation<DataCollectionEsr, Error, NewDataCollectionEsr>({
    mutationFn: createDataCollectionEsr,
  });
};

// API call to update an existing data collection entry
const updateDataCollectionEsr = async (updateData: DataCollectionEsr): Promise<DataCollectionEsr> => {
  const { data } = await axios.put(`/api/daydata/dataCollectionEsr`, updateData);
  return data; // Assuming the response is of type DataCollectionEsr
};

// Mutation hook for updating data collection
export const useUpdateDataCollectionEsr = (): UseMutationResult<DataCollectionEsr, Error, DataCollectionEsr> => {
  return useMutation<DataCollectionEsr, Error, DataCollectionEsr>({
    mutationFn: updateDataCollectionEsr,
  });
};
