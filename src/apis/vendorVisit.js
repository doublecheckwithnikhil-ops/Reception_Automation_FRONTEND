import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from './index.js';
import { handleRequest, isTodaysData } from '../utils/utils.js';

const BASE_URL = '/VendorVisit';

export const createVendorVisit = async (data) => {
    return handleRequest(() => axios.post(BASE_URL + "/Add", data));
};

export const getVendorVisits = async () => {
    return handleRequest(() => axios.get(BASE_URL + "/GetAll"));
};

export const getVendorVisitById = async (id) => {
    return handleRequest(() => axios.get(`${BASE_URL}/${id}`));
};

export const updateVendorVisit = async (data) => {
    return handleRequest(() => axios.post(`${BASE_URL}/update`, data));
};

export const updateVendorVisitOutTime = async (id) => {
    return handleRequest(() => axios.post(`${BASE_URL}/update-outtime`, {id}));
};

export const useGetVendorVisits = () => {
    return useQuery({
        queryKey: ['vendorvisit'],
        queryFn: getVendorVisits,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

export const useGetVendorVisitsToday = () => {
    return useQuery({
        queryKey: ['vendorvisit'],
        queryFn: getVendorVisits,
        refetchOnWindowFocus: false,
        retry: 1,
        select: data => data?.filter(v => isTodaysData(v.inDate))
    });
};
export const useCreateVendorVisit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createVendorVisit,
        onSuccess: () => {
            // message.success('Candidate visit created successfully');
            queryClient.invalidateQueries({ queryKey: ['vendorvisit'] }); // Invalidate the candidate visits list to refetch
        },
        onError: (error) => {

            // message.error(`Error creating candidate visit: ${error.message}`);
        }
    });

};

export const useUpdateVendorVisit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateVendorVisit,
        onSuccess: () => {
            // message.success('Candidate visit created successfully');
            queryClient.invalidateQueries({ queryKey: ['vendorvisit'] }); // Invalidate the candidate visits list to refetch
        },
        onError: (error) => {

            // message.error(`Error creating candidate visit: ${error.message}`);
        }
    });

};


export const useUpdateVendorVisitOutTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateVendorVisitOutTime,
        onSuccess: () => {
            // message.success('Candidate visit created successfully');
            queryClient.invalidateQueries({ queryKey: ['vendorvisit'] }); // Invalidate the candidate visits list to refetch
        },
        onError: (error) => {

            // message.error(`Error creating candidate visit: ${error.message}`);
        }
    });

};

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