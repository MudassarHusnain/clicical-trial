// hooks/useAnimalAssessment.ts
import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface AnimalAssessment {
  id: number;
  weight: number;
  lps: number;
  detamine: number;
  createdAt: Date;
  updatedAt: Date;
  dayId: number;
}

// Fetch animal assessments based on the dayId
const fetchAnimalAssessments = async (dayId: number): Promise<AnimalAssessment[]> => {
  const { data } = await axios.get(`/api/daydata/animalAssessment?dayId=${dayId}`);
  return data.animalAssessments; // Adjust based on your API response
};

// Custom hook for fetching animal assessments
export const useAnimalAssessments = (dayId: number) => {
  return useQuery<AnimalAssessment[], Error>({
    queryKey: ['animalAssessments', dayId],
    queryFn: () => fetchAnimalAssessments(dayId),
    enabled: !!dayId,
  });
};

// Define the new activity structure
interface NewAnimalAssessment {
  weight: number;
  lps: number;
  detamine: number;
  dayId: number;
}

// Create a new animal assessment
const createAnimalAssessment = async (newAssessment: NewAnimalAssessment): Promise<AnimalAssessment> => {
  const { data } = await axios.post('/api/daydata/animalAssessment', newAssessment);
  return data; // Assuming the response is of type AnimalAssessment
};

// Custom hook for creating a new animal assessment
export const useCreateAnimalAssessment = (): UseMutationResult<AnimalAssessment, Error, NewAnimalAssessment> => {
  return useMutation<AnimalAssessment, Error, NewAnimalAssessment>({
    mutationFn: createAnimalAssessment,
  });
};
