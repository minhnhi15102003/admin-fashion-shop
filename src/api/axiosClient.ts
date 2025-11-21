import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
        accessToken?: string;
        pathParams?: Record<string, string>;
        uId?: string;
    }
}

interface RefreshResponse {
    accessToken: string;
}

let refreshTokenRequest: Promise<string> | null = null;

// Tạo instance axios
const axiosClient: AxiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    // withCredentials: true,
});

//  Request Interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        if (config.url && config.baseURL) {
            const currentUrl = new URL(config.url, config.baseURL);
            Object.entries(config.pathParams || {}).forEach(([k, v]) => {
                currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
            });
            config.url = currentUrl.pathname + currentUrl.search;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

//  Response Interceptor
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenRequest) {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    handleLogout();
                    return Promise.reject(error);
                }

                refreshTokenRequest = axios
                    .post<RefreshResponse>(`${baseURL}/auth/refresh`, { refreshToken })
                    .then((res) => {
                        const newAccessToken = res.data.accessToken;
                        localStorage.setItem("access_token", newAccessToken);
                        refreshTokenRequest = null;
                        return newAccessToken;
                    })
                    .catch((err) => {
                        console.error("Refresh token failed:", err);
                        refreshTokenRequest = null;
                        handleLogout();
                        throw err;
                    });
            }

            const newToken = await refreshTokenRequest;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosClient(originalRequest);
        }

        return Promise.reject(error);
    }
);

export const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // window.location.href = "/login";
}

export default axiosClient;
