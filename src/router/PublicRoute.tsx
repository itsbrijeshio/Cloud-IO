import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const PublicRoute = ({ restricted = false }: { restricted?: boolean }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated && restricted ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
