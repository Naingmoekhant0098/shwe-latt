import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { DrawRequest, DrawResponse } from "../type";
import type {
  ApiDetailResponse,
  ApiListResponse,
} from "../../../shared/schemes/api_response";
import { customer_service } from "../service/service";

export const useGetUsers = (params?: Record<string, any>) => {
  return useQuery<ApiListResponse<DrawResponse>, Error>({
    queryKey: ["categories", params],
    queryFn: () => customer_service.getPaginatedData<DrawResponse>(params),
  });
};

export const useGetUserDetail = (id: number) => {
  return useQuery<DrawResponse, Error>({
    queryKey: ["category", id],
    queryFn: () =>
      customer_service.getById<DrawResponse>(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiDetailResponse<DrawResponse>, Error, DrawRequest>({
    mutationFn: (data) => customer_service.create<DrawResponse>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiDetailResponse<DrawResponse>,
    Error,
    { id: string; data: Partial<DrawRequest> }
  >({
    mutationFn: ({ id, data }) =>
      customer_service.update<DrawResponse>(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiDetailResponse<DrawResponse>, Error, number>({
    mutationFn: (id) => customer_service.remove<DrawResponse>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
