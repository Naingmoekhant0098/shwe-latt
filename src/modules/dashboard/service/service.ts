import api from "../../../app/api/axios";
import type { ApiDetailResponse, ApiListResponse } from "../../../shared/schemes/api_response";
import { apiService } from "../../../shared/service/baseCrud";

const baseService = apiService("/result");

const getPaginatedData = async <T>(params: any) => {
  const response = await api.post<ApiListResponse<T>>("/result", {
    params,
  });
  return response.data;
};


const getCategoryById = async <T>(id: number | string) : Promise<ApiDetailResponse<T>> => {
  const response = await api.post<ApiDetailResponse<T>>(`/result/${id}`);
  return response.data;
};

const checkingTicket = async <T>(id: number | string) : Promise<ApiDetailResponse<T>> => {
  const response = await api.post<ApiDetailResponse<T>>(`/winner-ticket/${id}/check`);
  return response.data;
};
 

 
export const result_service = {
  ...baseService,
  getPaginatedData,
  getCategoryById,
  checkingTicket
};
