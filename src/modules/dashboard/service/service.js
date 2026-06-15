import api from "../../../app/api/axios";
import { apiService } from "../../../shared/service/baseCrud";
const baseService = apiService("/result");
const getPaginatedData = async (params) => {
    const response = await api.post("/result", {
        params,
    });
    return response.data;
};
const getCategoryById = async (id) => {
    const response = await api.post(`/result/${id}`);
    return response.data;
};
const checkingTicket = async (id) => {
    const response = await api.post(`/winner-ticket/${id}/check`);
    return response.data;
};
export const result_service = {
    ...baseService,
    getPaginatedData,
    getCategoryById,
    checkingTicket
};
