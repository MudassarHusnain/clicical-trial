import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface Activity {
  id: number;
  comments: string;
  dayId: number;
  createdAt: string;
  updatedAt: string;
}

const fetchActivities = async (dayId: number): Promise<Activity[]> => {
  const { data } = await axios.get(`/api/daydata/activity?dayId=${dayId}`);
  return data.activities;
};

export const useActivities = (dayId: number) => {
  return useQuery<Activity[], Error>({
    queryKey: ['activities', dayId],
    queryFn: () => fetchActivities(dayId),
    enabled: !!dayId,
  });
};

interface NewActivity {
  comments: string;
  dayId: number;
}

const createActivity = async (newActivity: NewActivity): Promise<Activity> => {
  const { data } = await axios.post('/api/daydata/activity', newActivity);
  return data; // Assuming the response is of type Activity
};

export const useCreateActivity = (): UseMutationResult<Activity, Error, NewActivity> => {
  return useMutation<Activity, Error, NewActivity>({
    mutationFn: createActivity,
  });
};
