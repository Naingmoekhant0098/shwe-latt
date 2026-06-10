import { apiService } from "../../../shared/service/baseCrud";

const baseService = apiService("/townships");
export const townships_service = {
  ...baseService,
};
