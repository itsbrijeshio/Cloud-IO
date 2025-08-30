import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";
import type { UserType } from "../types";
import { apiHandler } from "../utils";
import useStore from "../store";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { action } = useStore();

  const loadProfile = () =>
    apiHandler(
      {
        url: "/auth/user",
        method: "get",
      },
      {
        onSuccess: (data: UserType) => {
          setUser(data);
          setIsAuthenticated(true);
        },
        setLoading,
      }
    );

  useEffect(() => {
    loadProfile();
  }, [action]);

  if (loading) {
    return <div>Loading..</div>;
  }

  const value = {
    user,
    isAuthenticated,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
