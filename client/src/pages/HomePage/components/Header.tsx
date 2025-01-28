import { Logo, SearchIcon, HamburgerIcon } from "@/assets/icons";
import { Dispatch, SetStateAction, MouseEvent } from "react";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleClickLogin: () => void;
  handleClickNav: (e: MouseEvent<HTMLButtonElement>) => void;
  isLoadingGoogleDataFetch: boolean;
  userId: string;
}

const Header = ({
  search,
  setSearch,
  handleClickLogin,
  handleClickNav,
  isLoadingGoogleDataFetch,
  userId,
}: HeaderProps) => {
  return (
    <header className="w-full grid grid-cols-2 lg:grid-cols-[1fr_3fr_3fr] xl:grid-cols-[1fr_1fr_1fr] gap-2 justify-items-center items-center">
      <i className="w-full flex justify-start items-center">
        <Logo className="w-[7.25rem] h-6" />
      </i>
      <div className="hidden lg:flex bg-white justify-center h-[50px] w-[360px] xl:w-[500px] px-6 border border-[#CCCCCC] rounded-full overflow-hidden items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none h-full px-1 placeholder:text-[#161616]"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <i className="h-6 w-6 flex justify-center items-center cursor-pointer">
          <SearchIcon className="w-6 h-6" />
        </i>
      </div>
      <div className="hidden lg:flex w-full items-center justify-end gap-2.5 shrink-0 text-xs lg:text-base lg:leading-5">
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
        {isLoadingGoogleDataFetch ? (
          <button className="px-1 py-0.5 shrink-0">Loading...</button>
        ) : (
          <button
            className="px-1 py-0.5 shrink-0"
            id={userId ? "my-account" : "login"}
            onClick={handleClickNav}
          >
            {userId ? "My Account" : "Log In"}
          </button>
        )}
        <button
          className="bg-[#FFE852] px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-semibold shrink-0"
          id="create-map"
          onClick={handleClickNav}
        >
          Create a Map
        </button>
      </div>
      <i className="h-6 w-full flex lg:hidden justify-end items-center cursor-pointer">
        <HamburgerIcon className="w-6 h-6" />
      </i>
    </header>
  );
};

export default Header;
