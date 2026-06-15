import { useState } from "react";
import { message } from "antd";
import authService from "../service/auth_service";
import { setCookie } from "typescript-cookie";
export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const login = async (values) => {
        setLoading(true);
        try {
            const response = await authService.login(values);
            if (response.success) {
                message.success(response.message);
                setCookie("token", response.data.token, { expires: 7 });
                return response;
            }
            else {
                message.error(response.message);
                return null;
            }
        }
        catch (error) {
            message.error("An unexpected error occurred");
            return null;
        }
        finally {
            setLoading(false);
        }
    };
    return { login, loading };
};
