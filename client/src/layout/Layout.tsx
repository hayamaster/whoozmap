import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="border-x-1 relative mx-auto flex h-dvh px-12 flex-col overflow-hidden border-black bg-white">
      <Outlet />
    </div>
  );
};

export default Layout;
