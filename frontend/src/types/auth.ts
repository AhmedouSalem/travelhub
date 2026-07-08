export type UserRole = "USER" | "ADMIN";

export type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
};

export type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type LoginRegisterResponse = {
    user: AuthUser;
    accessToken: string;
};

export type AuthContextValue = {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    login: (payload: LoginPayload) => Promise<AuthUser>;
    register: (payload: RegisterPayload) => Promise<AuthUser>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
};