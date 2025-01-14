import { ReactNode } from "react";
import { Logo } from "@/assets/icons";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full overflow-x-hidden flex flex-col">
      <header className="w-full h-24 flex justify-around items-center">
        <Logo className="w-28 h-10" />
        header
      </header>
      {children}
    </div>
  );
};

export default Header;
