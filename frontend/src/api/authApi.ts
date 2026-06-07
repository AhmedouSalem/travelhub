import type { LoginPayload, RegisterPayload } from "../types/auth";
import { api } from "./axiosClient";
import type { AuthUser, LoginRegisterResponse } from '../types/auth';
import { API_ROUTES } from "./apiRoutes";

export const authApi = {
    register: async (payload: RegisterPayload): Promise<LoginRegisterResponse> => {
        const response = await api.post(API_ROUTES.auth.register, payload);
        return response.data;
    },

    login: async (payload: LoginPayload) : Promise<LoginRegisterResponse>=>{
        const response = await api.post(API_ROUTES.auth.login, payload);
        return response.data;
    },

    getProfile: async (): Promise<AuthUser> => {
        const response = await api.get(API_ROUTES.auth.profile);
        return response.data;
    }
}