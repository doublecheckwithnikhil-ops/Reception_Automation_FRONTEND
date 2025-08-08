import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleRequest } from "../utils/utils";
import axiosInstance from './index';
import data from '../../response.json'

const VENDOR_API = '/vendor';

const getVendorList = async () => {
    return handleRequest(() => axiosInstance.get(VENDOR_API).then(response => response.data));        
};

const createVendor = async (data) => {
    return handleRequest(() => axiosInstance.post(VENDOR_API, data)); 
};
const updateVendor = async (id, data) => {
    return handleRequest(() =>axiosInstance.put(`${VENDOR_API}/${id}`, data));
};

export const useGetVendorList = () => {
    return useQuery({
        queryKey: ['vendorList'],
        queryFn: getVendorList,
        refetchOnWindowFocus: false,
        retry: 1,
        initialData: data.vendor
    });
}

export const useCreateVendor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createVendor,
        onSuccess: () => {
            // message.success('Vendor created successfully');
            queryClient.invalidateQueries({queryKey :['vendorList']}); // Invalidate the vendor list to refetch
        },
        onError: (error) => {
            // message.error(`Error creating vendor: ${error.message}`);
        }
    });
}

export const useUpdateVendor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateVendor,
        onSuccess: () => {
            // message.success('Vendor updated successfully');
             queryClient.invalidateQueries({queryKey :['vendorList']});
        },
        onError: (error) => {
            // message.error(`Error updating vendor: ${error.message}`);
        }
    });
}