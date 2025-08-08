import { useQuery } from "@tanstack/react-query";
import { handleRequest } from "../utils/utils";
import axiosInstance from "./index.js";// Ensure the correct import path for axiosInstance
import data from '../../response.json'

const EMPLOYEE_API = '/Employee/GetAll';

export const getEmployee = async (id) => {
    return handleRequest(() =>
        axiosInstance.get(`${EMPLOYEE_API}/${id}`)
    );
};

export const useGetEmployee = (id) => {
    return useQuery(['employee', id], () => getEmployee(id), {
        enabled: !!id,
    });
};

export const getAllEmployees = async (query = {}) => {
    return handleRequest(() =>
        axiosInstance.post(EMPLOYEE_API, { ...query })
        // axiosInstance.get(EMPLOYEE_API, { params: query })
    );
};

export const useGetAllEmployees = (query = {}) => {
     return useQuery({
            queryKey: ['employees', { ...query }],
            queryFn: () =>  getAllEmployees(query),
            refetchOnWindowFocus: false,
            retry: 1,
            initialData:data.employeelist,
            select: (data) => !Array.isArray(data) ?[] : data.map((employee) => ({    
                id: employee.employeeId,
                name: `${employee.firstName || ""} ${employee.middleName || ""} ${employee.lastName || ""}`,
                ecode: employee.ecode,
            })) // Adjust based on your API response structure
        });
    // return useQuery(['employees', query], () => getAllEmployees(query));
};

// export const useGetAllEmployees = (query = {}) => {
//      return useQuery({
//             queryKey: ['employees', { ...query }],
//             queryFn: () =>  getAllEmployees(query),
//             refetchOnWindowFocus: false,
//             retry: 1,
//         });
//     // return useQuery(['employees', query], () => getAllEmployees(query));
// };