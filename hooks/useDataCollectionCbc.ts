import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface DataCollectionCbc {
    id: number;
    parametersRefValue: number; // Assuming Int maps to number
    rbc: number;                // Assuming Float maps to number
    pcv: number;                // Assuming Float maps to number
    plt: number;                // Assuming Float maps to number
    wbc: number;                // Assuming Float maps to number
    neutrophil: number;        // Assuming Float maps to number
    lymphocyte: number;        // Assuming Float maps to number
    eosinophil: number;        // Assuming Float maps to number
    basophil: number;          // Assuming Float maps to number
    monocyte: number;          // Assuming Float maps to number
    mcv: number;               // Assuming Float maps to number
    mch: number;               // Assuming Float maps to number
    mchc: number;              // Assuming Float maps to number
    dayId: number;
}


// Fetch data collection for a specific day
const fetchDataCollectionCbc = async (dayId: number): Promise<DataCollectionCbc> => {
    const { data } = await axios.get(`/api/daydata/dataCollectionCbc?dayId=${dayId}`);
    return data.dataCollectionCbc; // Adjust based on your API response structure
};

export const useDataCollectionCbc = (dayId: number) => {
    return useQuery<DataCollectionCbc, Error>({
        queryKey: ['dataCollectionECbc', dayId],
        queryFn: () => fetchDataCollectionCbc(dayId),
        enabled: !!dayId,
    });
};
interface NewDataCollectionCbc {
    parametersRefValue: number; // Assuming Int maps to number
    rbc: number;                // Assuming Float maps to number
    pcv: number;                // Assuming Float maps to number
    plt: number;                // Assuming Float maps to number
    wbc: number;                // Assuming Float maps to number
    neutrophil: number;        // Assuming Float maps to number
    lymphocyte: number;        // Assuming Float maps to number
    eosinophil: number;        // Assuming Float maps to number
    basophil: number;          // Assuming Float maps to number
    monocyte: number;          // Assuming Float maps to number
    mcv: number;               // Assuming Float maps to number
    mch: number;               // Assuming Float maps to number
    mchc: number;              // Assuming Float maps to number
    dayId: number;
}


// API call to create a new data collection entry
const createDataCollectionCbc = async (newDataCollectionCbc: NewDataCollectionCbc): Promise<DataCollectionCbc> => {
    const { data } = await axios.post('/api/daydata/dataCollectionCbc', newDataCollectionCbc);
    return data; // Assuming the response is of type DataCollectionEsr
};

// Mutation hook for creating new data collection
export const useCreateDataCollectionCbc = (): UseMutationResult<DataCollectionCbc, Error, NewDataCollectionCbc> => {
    return useMutation<DataCollectionCbc, Error, NewDataCollectionCbc>({
        mutationFn: createDataCollectionCbc,
    });
};

const updateDataCollectionCbc = async (updateDataCollectionCbc: DataCollectionCbc): Promise<DataCollectionCbc> => {
    const { data } = await axios.put('/api/daydata/dataCollectionCbc', updateDataCollectionCbc);
    return data; // Assuming the response is of type DataCollectionEsr
};

// Mutation hook for creating new data collection
export const useUpdateDataCollectionCbc = (): UseMutationResult<DataCollectionCbc, Error, DataCollectionCbc> => {
    return useMutation<DataCollectionCbc, Error, DataCollectionCbc>({
        mutationFn: updateDataCollectionCbc,
    });
};