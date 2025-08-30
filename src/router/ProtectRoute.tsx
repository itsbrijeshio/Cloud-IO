import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectRoute = () => {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated && user?._id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
