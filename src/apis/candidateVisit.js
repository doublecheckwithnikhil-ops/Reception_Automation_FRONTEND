import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from './index.js';
import { handleRequest, isTodaysData } from '../utils/utils.js';

const BASE_URL = '/Candidate';

export const createCandidateVisit = async (data) => {
    return handleRequest(() => axios.post(BASE_URL, data));
};

export const getCandidateVisits = async () => {
    return handleRequest(() => axios.get(BASE_URL));
};

export const getCandidateVisitById = async (id) => {
    return handleRequest(() => axios.get(`${BASE_URL}/${id}`));
};

export const updateCandidateVisit = async (data) => {
    return handleRequest(() => axios.post(`${BASE_URL}/update`, data));
};

export const updateCandidateVisitOutTime = async (id) => {
    return handleRequest(() => axios.post(`${BASE_URL}/update--outtime`, { id }));
};

export const deleteCandidateVisit = async (id) => {
    return handleRequest(() => axios.delete(`${BASE_URL}/${id}`));
};

export const useGetCandidateVisits = () => {
    return useQuery({
        queryKey: ['candidateVisits'],
        queryFn: getCandidateVisits,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

export const useGetCandidateVisitsTodays = () => {
    return useQuery({
        queryKey: ['candidateVisits'],
        queryFn: getCandidateVisits,
        refetchOnWindowFocus: false,
        retry: 1,
        select: data => data?.filter(v => isTodaysData(v.inDate))
    });
};

export const useCreateCandidateVisit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCandidateVisit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candidateVisits'] });

        },
        onError: (error) => {

            message.error(`Error creating candidate visit: ${error.message}`);
        }
    });

};

export const useUpdateCandidateVisit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCandidateVisit,
        onSuccess: () => {
            // message.success('Candidate visit created successfully');
            queryClient.invalidateQueries({ queryKey: ['candidateVisits'] }); // Invalidate the candidate visits list to refetch
        },
        onError: (error) => {

            // message.error(`Error creating candidate visit: ${error.message}`);
        }
    });

};


export const useUpdateCandidateVisitOutTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCandidateVisitOutTime,
        onSuccess: () => {
            // message.success('Candidate visit created successfully');
            queryClient.invalidateQueries({ queryKey: ['candidateVisits'] }); // Invalidate the candidate visits list to refetch
        },
        onError: (error) => {

            // message.error(`Error creating candidate visit: ${error.message}`);
        }
    });

};

export const useDeleteCandidateVisit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCandidateVisit,
        onSuccess: () => {
            // message.success('Candidate visit created successfully');
            queryClient.invalidateQueries({ queryKey: ['candidateVisits'] }); // Invalidate the candidate visits list to refetch
        },
        onError: (error) => {

            // message.error(`Error creating candidate visit: ${error.message}`);
        }
    });
}

// Uncomment if you want to use the old axios instance directly
// import axios from '../utils/axiosInstance';
// const BASE_URL = '/candidate-visits';
//
// // Uncomment these functions if you want to use them directly without the handleRequest utility


// export const createCandidateVisit = async (data) => {
//     const response = await axios.post(BASE_URL, data);
//     return response.data;
// };

// export const getCandidateVisits = async () => {
//     const response = await axios.get(BASE_URL);
//     return response.data;
// };

// export const getCandidateVisitById = async (id) => {
//     const response = await axios.get(`${BASE_URL}/${id}`);
//     return response.data;
// };

// export const updateCandidateVisit = async (id, data) => {
//     const response = await axios.put(`${BASE_URL}/${id}`, data);
//     return response.data;
// };