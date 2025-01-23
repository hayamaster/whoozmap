import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Toaster />
      <main className="border-x-1 relative mx-auto flex h-dvh px-4 py-5 md:px-10 md:py-10 flex-col overflow-hidden border-black bg-white">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
