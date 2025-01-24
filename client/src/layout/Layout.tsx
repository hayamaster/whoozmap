import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Toaster />
      <main className="border-x-1 relative mx-auto flex h-dvh flex-col overflow-hidden bg-white">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
