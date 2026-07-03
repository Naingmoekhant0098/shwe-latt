import api from "../../../app/api/axios";
import type {
  ApiListResponse,
  ApiDetailResponse,
} from "../../../shared/schemes/api_response";
import { apiService } from "../../../shared/service/baseCrud";

const baseService = apiService("/ticket");

const getPaginatedData = async <T>(params: any) => {
  const response = await api.get<ApiListResponse<T>>("/ticket", {
    params,
  });
  return response.data;
};

// Override getById
const getById = async <T>(
  id: number | string,
  params?: any
): Promise<ApiDetailResponse<T>> => {
  const response = await api.get<ApiDetailResponse<T>>(`/ticket/${id}`, {
    params,
  });

  return response.data;
};

export const tickets_service = {
  ...baseService,
  getPaginatedData,
  getById, // this overrides baseService.getById
};