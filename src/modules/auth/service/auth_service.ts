import axios, { AxiosError } from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
    success: boolean;
  statusCode: number;
  message: string;
  data?: any;
}

const baseUrl = import.meta.env.VITE_IS_PRODUCTION
? import.meta.env.VITE_APP_PRODUCTION_URL
: import.meta.env.VITE_APP_UAT_URL;
const authService = {

  login: async (postBody: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, postBody);
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
        message: response?.data?.message || "Login successful",
      };
    } catch (err) {
      const error = err as AxiosError<any>;
      const msg =
        error.response?.data?.message ||
        error.response?.data?.errors[0] ||
        error.message ||
        "Login failed";
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: msg,
      };
    }
  },
};

export default authService;
