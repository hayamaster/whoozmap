import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full overflow-x-hidden flex flex-col">
      <header className="w-full h-24 flex justify-center items-center">
        header
      </header>
      {children}
    </div>
  );
};

export default Header;
