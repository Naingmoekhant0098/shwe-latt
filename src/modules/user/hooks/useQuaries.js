import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { user_service } from "../service/user_service";
export const useGetUsers = (params) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => user_service.getAll(params),
    });
};
export const useGetRoles = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: () => user_service.getAllRoles(),
    });
};
export const useGetUserDetail = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => user_service.getById(id).then((res) => res.data),
        enabled: !!id,
    });
};
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => user_service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => user_service.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => user_service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
