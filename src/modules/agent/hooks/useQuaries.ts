import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CustomerRequest, CustomerResponse } from "../type";
import type {
  ApiDetailResponse,
  ApiListResponse,
} from "../../../shared/schemes/api_response";
import { customer_service } from "../service/customer_service";

export const useGetUsers = (params?: Record<string, any>) => {
  return useQuery<ApiListResponse<CustomerResponse>, Error>({
    queryKey: ["agents", params],
    queryFn: () => customer_service.getPaginatedData<CustomerResponse>(params),
  });
};

// export const useGetRoles = () => {
//   return useQuery<ApiListResponse<any>, Error>({
//     queryKey: ["roles"],
//     queryFn: () => customer_service.getAllRoles<any>(),
//   });
// };

export const useGetAgentDetail = (id: string) => {
  return useQuery<CustomerResponse, Error>({
    queryKey: ["agents", id],
    queryFn: () =>
      customer_service.getById<CustomerResponse>(id).then((res) => res?.agent),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiDetailResponse<CustomerResponse>,
    Error,
    CustomerRequest
  >({
    mutationFn: (data) => customer_service.create<CustomerResponse>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiDetailResponse<CustomerResponse>,
    Error,
    { id: number; data: Partial<CustomerRequest> }
  >({
    mutationFn: ({ id, data }) =>
      customer_service.update<CustomerResponse>(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["agent", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiDetailResponse<CustomerResponse>, Error, number>({
    mutationFn: (id) => customer_service.remove<CustomerResponse>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });
};
