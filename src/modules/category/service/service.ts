import api from "../../../app/api/axios";
import type { ApiListResponse } from "../../../shared/schemes/api_response";
import { apiService } from "../../../shared/service/baseCrud";

const baseService = apiService("/draw-category");

const getPaginatedData = async <T>(params: any) => {
  const response = await api.get<ApiListResponse<T>>("/draw-category", {
    params,
  });
  return response.data;
};
export const customer_service = {
  ...baseService,
  getPaginatedData,
};
