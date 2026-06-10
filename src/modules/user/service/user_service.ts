import api from "../../../app/api/axios";
import type { ApiListResponse } from "../../../shared/schemes/api_response";
import { apiService } from "../../../shared/service/baseCrud";

const baseService = apiService("/admin/users");

const getAllRoles = async <T>() => {
  const response = await api.get<ApiListResponse<T>>("/admin/roles");
  return response.data;
};
export const user_service = {
  ...baseService,
  getAllRoles,
};
