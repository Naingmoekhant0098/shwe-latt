import { useQuery } from "@tanstack/react-query";
import { result_service } from "../service/service";
export const useGetResults = (params) => {
    return useQuery({
        queryKey: ["results", params],
        queryFn: () => result_service.getPaginatedData(params),
    });
};
export const useGetResultDetail = (id) => {
    return useQuery({
        queryKey: ["results", id],
        queryFn: async () => {
            const res = await result_service.getCategoryById(id);
            return res?.data || res;
        },
        enabled: !!id,
    });
};
export const useGetWinnerDetail = (id) => {
    return useQuery({
        queryKey: ["winner-results", id],
        queryFn: async () => {
            const res = await result_service.checkingTicket(id);
            return res?.data || res;
        },
        enabled: !!id,
    });
};
