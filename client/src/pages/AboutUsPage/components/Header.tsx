import { Logo, HamburgerIcon, CloseIcon } from "@/assets/icons";
import { MouseEvent, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  handleClickLogin: () => void;
  handleClickNav: (e: MouseEvent<HTMLButtonElement>) => void;
  userId: string;
}

const Header = ({ handleClickLogin, handleClickNav, userId }: HeaderProps) => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);
  const [hamburgerMenuHeight, setHamburgerMenuHeight] = useState(0);

  const getHamburgerMenuHeight = useCallback(() => {
    if (headerRef.current) {
      const parentNode = headerRef.current.parentNode as HTMLElement;
      const height = parentNode.offsetHeight;

      setHamburgerMenuHeight(height);
    }
  }, []);

  useEffect(() => {
    getHamburgerMenuHeight();
    window.addEventListener("resize", getHamburgerMenuHeight);
    return () => window.removeEventListener("resize", getHamburgerMenuHeight);
  }, [getHamburgerMenuHeight]);

  return (
    <div
      className="relative w-full px-4 py-5 sm:px-10 sm:py-10"
      ref={headerRef}
    >
      <div
        className={`w-full bg-white ${openHamburgerMenu && "absolute top-0 left-0 flex flex-col z-20 px-4 py-5 sm:px-10 sm:py-10"}`}
        style={openHamburgerMenu ? { height: `${hamburgerMenuHeight}px` } : {}}
      >
        <header className="w-full bg-white grid grid-cols-2 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr] gap-2 justify-items-center items-center">
          <i
            className="w-full flex justify-start items-center"
            onClick={() => navigate("/")}
          >
            <Logo className="w-[8.5rem] h-4 lg:w-[10.5rem] lg:h-5" />
          </i>
          <div className="hidden lg:flex w-full items-center justify-end gap-2.5 shrink-0 text-base leading-5">
            <button
              className="px-1 py-0.5 shrink-0"
              id="maps"
              onClick={handleClickLogin}
            >
              Maps
            </button>
            <button
              className="px-1 py-0.5 shrink-0"
              id="about-us"
              onClick={handleClickNav}
            >
              About us
            </button>

            <button
              className="px-1 py-0.5 shrink-0"
              id={userId ? "my-account" : "login"}
              onClick={handleClickNav}
            >
              {userId ? "My Account" : "Log In"}
            </button>
            <button
              className="bg-[#FFE852] px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-semibold shrink-0"
              id="create-map"
              onClick={handleClickNav}
            >
              Create a Map
            </button>
          </div>
          <i className="h-6 w-full flex lg:hidden justify-end items-center cursor-pointer">
            {openHamburgerMenu ? (
              <CloseIcon
                className="w-6 h-6"
                onClick={() => setOpenHamburgerMenu(false)}
              />
            ) : (
              <HamburgerIcon
                className="w-6 h-6"
                onClick={() => setOpenHamburgerMenu(true)}
              />
            )}
          </i>
        </header>
        {openHamburgerMenu && (
          <div className="flex flex-col pt-7 sm:pt-10 lg:hidden w-full h-full bg-white items-start gap-5 text-base leading-5">
            <button
              className="px-1 py-0.5 shrink-0"
              id="maps"
              onClick={handleClickLogin}
            >
              Maps
            </button>
            <button
              className="px-1 py-0.5 shrink-0"
              id="about-us"
              onClick={handleClickNav}
            >
              About us
            </button>
            <button
              className="px-1 py-0.5 shrink-0"
              id={userId ? "my-account" : "login"}
              onClick={handleClickNav}
            >
              {userId ? "My Account" : "Log In"}
            </button>

            <button
              className="px-1 py-0.5 shrink-0"
              id="create-map"
              onClick={handleClickNav}
            >
              Create a Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
