import api from "../../app/api/axios";
import type {
  ApiListResponse,
  ApiDetailResponse,
} from "../schemes/api_response";

export interface BaseEntity {
  id?: number | string;
  [key: string]: any;
}
export const apiService = (endpoint: string) => {
  return {
    getAll: <T>(params?: any): Promise<ApiListResponse<T>> =>
      api.get<ApiListResponse<T>>(endpoint, { params }).then((res) => res.data),

    getById: <T>(id: number | string): Promise<ApiDetailResponse<T>> =>
      api
        .get<ApiDetailResponse<T>>(`${endpoint}/${id}`)
        .then((res) => res.data),

    create: <T>(data: Partial<T> | any): Promise<ApiDetailResponse<T>> =>
      api.post<ApiDetailResponse<T>>(endpoint, data).then((res) => res.data),

    update: <T>(
      id: number | string,
      data: Partial<T> | any
    ): Promise<ApiDetailResponse<T>> =>
      api
        .put<ApiDetailResponse<T>>(`${endpoint}/${id}`, data)
        .then((res) => res.data),

    remove: <T>(id: number | string): Promise<ApiDetailResponse<T>> =>
      api
        .delete<ApiDetailResponse<T>>(`${endpoint}/${id}`)
        .then((res) => res.data),

    uploadFiles: <T>(
      id: number | string,
      formData: FormData
    ): Promise<ApiDetailResponse<T>> =>
      api
        .put<ApiDetailResponse<T>>(`${endpoint}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  };
};
