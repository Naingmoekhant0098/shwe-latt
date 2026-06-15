import { useQuery } from "@tanstack/react-query";
import { cities_service } from "../../service/master/city_service";
import { townships_service } from "../../service/master/township_service";
export const useGetLocations = () => {
    return useQuery({
        queryKey: ["locations"],
        queryFn: async () => {
            const [citiesRes, townshipsRes] = await Promise.all([
                cities_service.getAll(),
                townships_service.getAll(),
            ]);
            return {
                cities: citiesRes.data,
                townships: townshipsRes.data,
            };
        },
    });
};
