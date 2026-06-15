import api from "../../../app/api/axios";
import { apiService } from "../../../shared/service/baseCrud";
const baseService = apiService("/agent");
const getPaginatedData = async (params) => {
    const response = await api.get("/agent", {
        params,
    });
    return response.data;
};
export const customer_service = {
    ...baseService,
    getPaginatedData,
};
