import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center p-5 bg-gradient-to-br from-primary/20 to-accent/20">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
