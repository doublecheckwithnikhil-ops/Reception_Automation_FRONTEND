import { useQuery } from "@tanstack/react-query";
import { handleRequest } from "../utils/utils";
import axiosInstance from ".";
import data from '../../response.json'

const DIVISION = "/Division/active";

const getDivisions = async () => {
    return handleRequest(() =>
        axiosInstance.get(DIVISION)
    );
}

export const useGetDivisions = () => {
    return useQuery({
        queryKey: ['divisions'],
        queryFn: getDivisions,
        refetchOnWindowFocus: false,
        retry: 1,
        initialData: data.division
    });
}

