import { useNavigate } from "react-router-dom";
import { useGetUserDetail } from "./useQuaries";
export const useCustomerDetailController = (id) => {
    const { data, isLoading } = useGetUserDetail(Number(id));
    const navigate = useNavigate();
    const doctor = data || {};
    const renderValue = (value) => {
        if (typeof value === "object" && value !== null) {
            return value.name || value.label || JSON.stringify(value);
        }
        return value || "N/A";
    };
    const handleBack = () => {
        navigate(-1);
    };
    const serviceData = doctor?.services?.map((service) => ({
        key: `${service.id}`,
        serviceName: service.name,
        category: service.category,
        description: service.description,
        shareType: service.share_type === "fixed_price" ? "Fixed Price" : "Percentage",
        price: `${service?.price_config?.dr_share_value.toLocaleString()} MMK`,
    }));
    return {
        handleBack,
        serviceData,
        doctor,
        isLoading,
        renderValue,
    };
};
