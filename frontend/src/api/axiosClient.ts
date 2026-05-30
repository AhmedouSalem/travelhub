import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const API_BASE_RUL = import.meta.env.VITE_API_BASE_URL || "https://travelhub-3til.onrender.com";

export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_RUL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("travelhub_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => Promise.reject(error),
);