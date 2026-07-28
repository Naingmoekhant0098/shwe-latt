import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TicketRequest, TicketResponse } from "../type";
import type {
  ApiDetailResponse,
  ApiListResponse,
} from "../../../shared/schemes/api_response";
import { tickets_service } from "../service/ticket_service";

export const useGetTickets = (params?: Record<string, any>) => {
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

export const useGetTicketDetail = (
  id: string,
  currentPage: number,
  perPage: number
) => {
  return useQuery({
    queryKey: ["tickets", id, currentPage, perPage],
    queryFn: () =>
      tickets_service.getById<any>(id, {
        page: currentPage,
        limit: perPage,
      }),
    enabled: !!id,
  });
};

export const useCreateTicket = () => {
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

export const useGetTicketByAgentId = (
  agentId: string,
  drawCategoryId: string
) => {
  return useQuery({
    queryKey: ["mtickets", "magent", agentId, drawCategoryId],
    queryFn: () => tickets_service.getByAgentId<any>(agentId, drawCategoryId),
    enabled: !!agentId && !!drawCategoryId,
  });
};

export const useUpdateTicket = () => {
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

export const useTransferTickets = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiDetailResponse<any>, Error, any>({
    mutationFn: (payload) => tickets_service.transferTickets(payload),
    onSuccess: () => {
      // Invalidate general tickets query
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      // Invalidate agent tickets query to refresh MoveTickets screen
      queryClient.invalidateQueries({ queryKey: ["mtickets"] });
    },
  });
};



export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiDetailResponse<TicketResponse>, Error, number>({
    mutationFn: (id) => tickets_service.remove<TicketResponse>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};
