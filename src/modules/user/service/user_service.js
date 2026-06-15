import api from "../../../app/api/axios";
import { apiService } from "../../../shared/service/baseCrud";
const baseService = apiService("/admin/users");
const getAllRoles = async () => {
    const response = await api.get("/admin/roles");
    return response.data;
};
export const user_service = {
    ...baseService,
    getAllRoles,
};
