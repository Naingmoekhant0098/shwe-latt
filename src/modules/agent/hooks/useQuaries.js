import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customer_service } from "../service/customer_service";
export const useGetUsers = (params) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => customer_service.getPaginatedData(params),
    });
};
// export const useGetRoles = () => {
//   return useQuery<ApiListResponse<any>, Error>({
//     queryKey: ["roles"],
//     queryFn: () => customer_service.getAllRoles<any>(),
//   });
// };
export const useGetUserDetail = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => customer_service.getById(id).then((res) => res.data),
        enabled: !!id,
    });
};
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => customer_service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => customer_service.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => customer_service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
