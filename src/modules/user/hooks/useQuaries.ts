import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserRequest, UserResponse } from "../type";
import type {
  ApiDetailResponse,
  ApiListResponse,
} from "../../../shared/schemes/api_response";
import { user_service } from "../service/user_service";

export const useGetUsers = (params?: Record<string, any>) => {
  return useQuery<ApiListResponse<UserResponse>, Error>({
    queryKey: ["users", params],
    queryFn: () => user_service.getAll<UserResponse>(params),
  });
};

export const useGetRoles = () => {
  return useQuery<ApiListResponse<any>, Error>({
    queryKey: ["roles"],
    queryFn: () => user_service.getAllRoles<any>(),
  });
};

export const useGetUserDetail = (id: number) => {
  return useQuery<UserResponse, Error>({
    queryKey: ["user", id],
    queryFn: () =>
      user_service.getById<UserResponse>(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiDetailResponse<UserResponse>, Error, UserRequest>({
    mutationFn: (data) => user_service.create<UserResponse>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiDetailResponse<UserResponse>,
    Error,
    { id: number; data: Partial<UserRequest> }
  >({
    mutationFn: ({ id, data }) => user_service.update<UserResponse>(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiDetailResponse<UserResponse>, Error, number>({
    mutationFn: (id) => user_service.remove<UserResponse>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
