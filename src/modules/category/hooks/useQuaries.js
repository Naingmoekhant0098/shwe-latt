import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customer_service } from "../service/service";
export const useGetUsers = (params) => {
    return useQuery({
        queryKey: ["categories", params],
        queryFn: () => customer_service.getPaginatedData(params),
    });
};
export const useGetUserDetail = (id) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => customer_service.getById(id).then((res) => res.data),
        enabled: !!id,
    });
};
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => customer_service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => customer_service.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => customer_service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
