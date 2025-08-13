import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './index.js';
import { message } from 'antd';
import { isTodaysData } from '../utils/utils.js';

// const MATERIAL_API = '/materials';
const MATERIAL_API = "/ReceiveMaterial";

// Helper function for error handling
const handleRequest = async (request) => {
    try {
        const response = await request;
        return response?.data?.data;
    } catch (error) {
        // You can customize error handling here
        throw error;
    }
};

// Create (POST)
export const createMaterial = (data) => {
    return handleRequest(axiosInstance.post(MATERIAL_API + "/add", data));
};

// Get all materials (GET)
export const getMaterials = () => {
    return handleRequest(axiosInstance.get(MATERIAL_API + '/getAll'));
};

// Get material by ID (GET)
export const getMaterialById = (id) => {
    return handleRequest(axiosInstance.get(`${MATERIAL_API}/${id}`));
};

// Update material (PUT)
export const updateMaterial = (data) => {
    return handleRequest(axiosInstance.post(`${MATERIAL_API}/update`, data));
};

export const deleteMaterial = ({id, deletedBy}) => {
    return handleRequest(axiosInstance.delete(`${MATERIAL_API}/delete/${id}?deletedBy=${deletedBy}`));
};

const useDeleteMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMaterial,
        onSuccess: () => {
            message.success('Material created successfully');
            queryClient.invalidateQueries({ queryKey: ['materials'] }); // Invalidate the materials list to refetch
        },
        onError: (error) => {
            message.error(`Error creating material: ${error.message}`);
        }
    });
}


const useGetMaterials = (enabled = true) => {
    return useQuery({
        queryKey: ['materials', 'receive'],
        queryFn: getMaterials,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled
    });
};

const useCreateMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMaterial,
        onSuccess: () => {
            message.success('Material created successfully');
            queryClient.invalidateQueries({ queryKey: ['materials'] }); // Invalidate the materials list to refetch
        },
        onError: (error) => {
            message.error(`Error creating material: ${error.message}`);
        }
    });
}

const useUpdateMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMaterial,
        onSuccess: () => {
            // message.success('Material updated successfully');
            queryClient.invalidateQueries({ queryKey: ['materials'] });
        },
        onError: (error) => {
            message.error(`Error updating material: ${error.message}`);
        }
    });
}

const useGetMaterialsToday = (enabled = true) => {
    return useQuery({
        queryKey: ['materials', 'receive'],
        queryFn: getMaterials,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled,
        select: data => {
            return data?.filter(v => isTodaysData(v.inDate));
        }
    });
};


const useGetReceiveMaterials = useGetMaterials;
const useCreateReceiveMaterial = useCreateMaterial;
const useUpdateReceiveMaterial = useUpdateMaterial;
const useGetReceiveMaterialsToday = useGetMaterialsToday;
const useDeleteReceiveMaterial  = useDeleteMaterial;

export {
    useGetReceiveMaterials,
    useCreateReceiveMaterial,
    useUpdateReceiveMaterial,
    useGetReceiveMaterialsToday,
    useDeleteReceiveMaterial
}