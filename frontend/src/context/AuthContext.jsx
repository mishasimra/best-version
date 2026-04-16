import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { api, fetcher, storageKey } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { token: null, user: null };
  });
  const [booting, setBooting] = useState(Boolean(auth?.token));

  useEffect(() => {
    if (!auth?.token) {
      setBooting(false);
      return;
    }

    fetcher("/auth/me")
      .then((data) => {
        const nextAuth = { token: auth.token, user: data.user };
        setAuth(nextAuth);
        localStorage.setItem(storageKey, JSON.stringify(nextAuth));
      })
      .catch(() => {
        localStorage.removeItem(storageKey);
        setAuth({ token: null, user: null });
      })
      .finally(() => setBooting(false));
  }, [auth?.token]);

  const value = useMemo(
    () => ({
      auth,
      booting,
      isAuthenticated: Boolean(auth?.token),
      async login(payload) {
        const { data } = await api.post("/auth/login", payload);
        const nextAuth = {
          token: data.data.token,
          user: data.data.user,
        };
        setAuth(nextAuth);
        localStorage.setItem(storageKey, JSON.stringify(nextAuth));
        toast.success(`Welcome back, ${nextAuth.user.name.split(" ")[0]}`);
        return nextAuth;
      },
      async register(payload) {
        const { data } = await api.post("/auth/register", payload);
        const nextAuth = {
          token: data.data.token,
          user: data.data.user,
        };
        setAuth(nextAuth);
        localStorage.setItem(storageKey, JSON.stringify(nextAuth));
        toast.success("Account created");
        return nextAuth;
      },
      logout() {
        setAuth({ token: null, user: null });
        localStorage.removeItem(storageKey);
        toast.success("Logged out");
      },
      updateUser(user) {
        const nextAuth = { ...auth, user };
        setAuth(nextAuth);
        localStorage.setItem(storageKey, JSON.stringify(nextAuth));
      },
    }),
    [auth, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
