import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import { AuthLayout, DefaultLayout } from "../layouts";
import PublicRoute from "./PublicRoute";
import ProtectRoute from "./ProtectRoute";
import { Dashboard, Home, Login, Register } from "../pages";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public with restricted Routes */}
          <Route element={<PublicRoute restricted />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          {/* Public without restricted Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Protect Routes */}
          <Route element={<DefaultLayout />}>
            <Route element={<ProtectRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:resource_id" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
