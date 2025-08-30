import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="fixed left-64 w-[calc(100vw-250px)] h-[calc(100vh-60px)] p-4 rounded-t-3xl bg-base-200">
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
