import { createContext, useEffect, useMemo, useState } from "react";
import type { AuthContextValue, AuthUser, LoginPayload } from "../types/auth";
import { authApi } from "../api/authApi";

export const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "travelhub_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );

  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    const profile = await authApi.getProfile();
    setUser(profile);
  };

  const login = async (payload: LoginPayload): Promise<AuthUser> => {
    const data = await authApi.login(payload);

    localStorage.setItem(TOKEN_KEY, data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);

    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await refreshProfile();
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "ADMIN",
      isLoading,
      login,
      logout,
      refreshProfile,
    }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
