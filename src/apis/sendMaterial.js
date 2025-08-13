import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './index.js';
import { use } from 'react';
import { isTodaysData } from '../utils/utils.js';

// const MATERIAL_API = '/materials';
const MATERIAL_API = '/SendMaterial';

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
const createMaterial = (data) => {
    return handleRequest(axiosInstance.post(MATERIAL_API, data));
};

// Get all materials (GET)
const getMaterials = () => {
    return handleRequest(axiosInstance.get(MATERIAL_API));
};

// Get material by ID (GET)
const getMaterialById = (id) => {
    return handleRequest(axiosInstance.get(`${MATERIAL_API}/${id}`));
};

// Update material (PUT)
const updateMaterial = (data) => {
    return handleRequest(axiosInstance.post(`${MATERIAL_API}/update`, data));
};

export const deleteMaterial = (id) => {
    return handleRequest(axiosInstance.delete(`${MATERIAL_API}/delete/${id}`));
};

const useGetMaterials = (enabled = true) => {
    return useQuery({
        queryKey: ['sendMaterials'],
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
            queryClient.invalidateQueries({ queryKey: ['sendMaterials'] }); // Invalidate the materials list to refetch
        },
        onError: (error) => {
            console.error(`Error creating material: ${error.message}`);
           
        }
    });
}

const useUpdateMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMaterial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sendMaterials'] });
        },
        onError: (error) => {
            console.error(`Error updating material: ${error.message}`);
        }
    });
}

const useGetMaterialsToday = (enabled = true) => {
    return useQuery({
        queryKey: ['sendMaterials'],
        queryFn: getMaterials,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled,
        select: data => {
            return data?.filter(v => isTodaysData(v.outDate));
        }
    });
};

const useDeleteMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMaterial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sendMaterials'] }); // Invalidate the materials list to refetch
        },
        onError: (error) => {
            console.error(`Error creating material: ${error.message}`);
        }
    });
}

const useGetSendMaterials = useGetMaterials;
const useCreateSendMaterial = useCreateMaterial;
const useUpdateSendMaterial = useUpdateMaterial;
const useGetSendMaterialsToday = useGetMaterialsToday
const useDeleteSendMaterial  = useDeleteMaterial;

export {
    useGetSendMaterials,
    useCreateSendMaterial,
    useUpdateSendMaterial,
    useGetSendMaterialsToday,
    useDeleteSendMaterial
}

