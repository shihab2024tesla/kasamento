import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    authService.getCurrentUser().then((current) => {
      if (!cancelled) {
        setUser(current);
        setInitializing(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (identifier, password, rememberMe) => {
    const loggedInUser = await authService.login(identifier, password, rememberMe);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      initializing,
      login,
      logout,
    }),
    [user, initializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
