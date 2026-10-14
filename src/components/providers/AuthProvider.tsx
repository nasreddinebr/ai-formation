"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiError, api, type ChangePasswordPayload, type ProfileUpdatePayload, type RegisterPayload, type User } from "@/lib/api/client";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (payload: RegisterPayload) => Promise<User>;
  signOut: () => Promise<void>;
  reload: () => Promise<User | null>;
  updateProfile: (payload: ProfileUpdatePayload) => Promise<User>;
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const reload = useCallback(async (): Promise<User | null> => {
    try {
      const current = await api.me();
      setUser(current);
      setStatus("authenticated");
      return current;
    } catch (error) {
      if (error instanceof ApiError && error.isUnauthorized) {
        setUser(null);
        setStatus("anonymous");
        return null;
      }
      // Network hiccup: keep whatever we had rather than logging the user out.
      setStatus((prev) => (prev === "loading" ? "anonymous" : prev));
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;
    api.me().then(
      (current) => {
        if (!active) return;
        setUser(current);
        setStatus("authenticated");
      },
      () => {
        if (!active) return;
        setUser(null);
        setStatus("anonymous");
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const current = await api.login({ email, password });
    setUser(current);
    setStatus("authenticated");
    return current;
  }, []);

  const signUp = useCallback(async (payload: RegisterPayload) => {
    const current = await api.register(payload);
    setUser(current);
    setStatus("authenticated");
    return current;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setStatus("anonymous");
    }
  }, []);

  const updateProfile = useCallback(async (payload: ProfileUpdatePayload) => {
    const updated = await api.updateProfile(payload);
    setUser(updated);
    return updated;
  }, []);

  const changePassword = useCallback(async (payload: ChangePasswordPayload) => {
    await api.changePassword(payload);
    // Every session is invalidated server-side; reflect that locally.
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated" && user !== null,
      signIn,
      signUp,
      signOut,
      reload,
      updateProfile,
      changePassword,
    }),
    [user, status, signIn, signUp, signOut, reload, updateProfile, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un <AuthProvider>.");
  }
  return context;
}
