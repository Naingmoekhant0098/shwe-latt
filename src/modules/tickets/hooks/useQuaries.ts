import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TicketRequest, TicketResponse } from "../type";
import type {
  ApiDetailResponse,
  ApiListResponse,
} from "../../../shared/schemes/api_response";
import { tickets_service } from "../service/ticket_service";

export const useGetUsers = (params?: Record<string, any>) => {
  return useQuery<ApiListResponse<TicketResponse>, Error>({
    queryKey: ["tickets", params],
    queryFn: () => tickets_service.getPaginatedData<TicketResponse>(params),
  });
};

// export const useGetRoles = () => {
//   return useQuery<ApiListResponse<any>, Error>({
//     queryKey: ["roles"],
//     queryFn: () => tickets_service.getAllRoles<any>(),
//   });
// };

export const useGetUserDetail = (id: string) => {
  return useQuery<TicketResponse, Error>({
    queryKey: ["tickets", id],
    queryFn: () =>
      tickets_service
        .getById<TicketResponse>(id)
        .then((res: any) => res?.tickets),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiDetailResponse<TicketResponse>, Error, TicketRequest>({
    mutationFn: (data) => tickets_service.create<TicketResponse>(data),
    onSuccess: (newTicket: any) => {
      queryClient.invalidateQueries({
        queryKey: ["tickets", newTicket.ticket.DrawCategory],
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiDetailResponse<TicketResponse>,
    Error,
    { id: number; data: Partial<TicketRequest> }
  >({
    mutationFn: ({ id, data }) =>
      tickets_service.update<TicketResponse>(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiDetailResponse<TicketResponse>, Error, number>({
    mutationFn: (id) => tickets_service.remove<TicketResponse>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};
