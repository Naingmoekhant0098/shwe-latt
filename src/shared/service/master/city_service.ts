import { apiService } from "../../../shared/service/baseCrud";

const baseService = apiService("/cities");
export const cities_service = {
  ...baseService,
};
