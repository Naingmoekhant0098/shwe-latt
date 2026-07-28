import { useQuery } from "@tanstack/react-query";

import type { ResultResponse } from "../type";

import type { ApiListResponse } from "../../../shared/schemes/api_response";

import { result_service } from "../service/service";

export const useGetResults = (params?: Record<string, any>) => {
  return useQuery<ApiListResponse<ResultResponse>, Error>({
    queryKey: ["results", params],
    queryFn: () => result_service.getPaginatedData<ResultResponse>(params),
  });
};

export const useGetResultDetail = (id: string) => {
  return useQuery<any, Error>({
    queryKey: ["results", id],
    queryFn: async () => {
      const res = await result_service.getCategoryById<any>(id);

      return res?.data || res;
    },
    enabled: !!id,
  });
};

export const useGetCheckWinner = (id: string,selectedAgentId : string) => {
  return useQuery<any, Error>({
    queryKey: ["check-winner", id,selectedAgentId],
    queryFn: async () => {
      const res = await result_service.checkingTicket<any>(id,selectedAgentId);
      return res;
    },
    enabled: !!id,
  });
};

export const useCheckWinners = (id?: string) => {
 

  return useQuery<any, Error>({
    queryKey: ["see-winner-result", id],
    queryFn: async () => {
      console.log("queryFn running with id:", id);

      const res = await result_service.checkWinnerTickets<any>(id);
     

      return res?.data || res;
    },
    enabled: !!id,  
  });
};
