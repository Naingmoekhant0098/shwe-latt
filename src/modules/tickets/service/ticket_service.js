import api from "../../../app/api/axios";
import { apiService } from "../../../shared/service/baseCrud";
const baseService = apiService("/ticket");
const getPaginatedData = async (params) => {
    const response = await api.get("/ticket", {
        params,
    });
    return response.data;
};
export const tickets_service = {
    ...baseService,
    getPaginatedData,
};
