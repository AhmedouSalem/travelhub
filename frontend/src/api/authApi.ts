import type { LoginPayload, RegisterPayload } from "../types/auth";
import { api } from "./axiosClient";
import type { AuthUser, LoginRegisterResponse } from '../types/auth';

export const authApi = {
    register: async (payload: RegisterPayload): Promise<LoginRegisterResponse> => {
        const response = await api.post("/auth/register", payload);
        return response.data;
    },

    login: async (payload: LoginPayload) : Promise<LoginRegisterResponse>=>{
        const response = await api.post("/auth/login", payload);
        return response.data;
    },

    getProfile: async (): Promise<AuthUser> => {
        const response = await api.get("/auth/profile");
        return response.data;
    }
}