import axiosInstance from "./index";
import { handleRequest } from './../utils/utils';
import { useMutation } from "@tanstack/react-query";


export const login = (credentials) => {
    return handleRequest(() => axiosInstance.post("/User/login", credentials));
};

export const useLogin = () => {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
    });
}   