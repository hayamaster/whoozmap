import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="border-x-1 relative mx-auto flex h-dvh flex-col overflow-hidden border-black bg-white desktop:mx-auto desktop:max-w-[375px]">
      <Outlet />
    </div>
  );
};

export default Layout;
