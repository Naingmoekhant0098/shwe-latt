import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tickets_service } from "../service/ticket_service";
export const useGetUsers = (params) => {
    return useQuery({
        queryKey: ["tickets", params],
        queryFn: () => tickets_service.getPaginatedData(params),
    });
};
// export const useGetRoles = () => {
//   return useQuery<ApiListResponse<any>, Error>({
//     queryKey: ["roles"],
//     queryFn: () => tickets_service.getAllRoles<any>(),
//   });
// };
export const useGetUserDetail = (id) => {
    return useQuery({
        queryKey: ["tickets", id],
        queryFn: () => tickets_service
            .getById(id)
            .then((res) => res?.tickets),
        enabled: !!id,
    });
};
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => tickets_service.create(data),
        onSuccess: (newTicket) => {
            queryClient.invalidateQueries({
                queryKey: ["tickets", newTicket.ticket.DrawCategory],
            });
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => tickets_service.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            queryClient.invalidateQueries({ queryKey: ["ticket", variables.id] });
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => tickets_service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};
