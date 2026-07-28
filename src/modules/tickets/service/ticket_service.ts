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

const getByAgentId = async <T>(
  agentId: number | string,
  drawCategoryId: number | string
): Promise<ApiListResponse<T>> => {
  const response = await api.get<ApiListResponse<T>>(
    `/ticket/agent/${agentId}/drawCategory/${drawCategoryId}`
  );

  return response.data;
};

const transferTickets = async <T = any>(
  payload: any
): Promise<ApiDetailResponse<T>> => {
  const response = await api.post<ApiDetailResponse<T>>(
    "/ticket/transfer",
    payload
  );
  return response.data;
};

export const tickets_service = {
  ...baseService,
  transferTickets,
  getPaginatedData,
  getByAgentId,
  getById, // this overrides baseService.getById
};
