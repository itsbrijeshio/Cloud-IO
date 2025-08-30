import { createContext } from "react";
import type { AuthContextType } from "../types";

const initialState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
