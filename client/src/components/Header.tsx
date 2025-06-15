import { Logo, SearchIcon, HamburgerIcon, CloseIcon } from "@/assets/icons";
import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePostGoogleLogin, useGetUserDetails } from "@/apis/hooks";
import { setUser, setToken } from "@/redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginModal, SignupModal } from "@/components";

interface HeaderProps {
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { mutate: googleLoginMutate } = usePostGoogleLogin();
  const { data: userDetails } = useGetUserDetails();

  const headerRef = useRef<HTMLDivElement>(null);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);
  const [hamburgerMenuHeight, setHamburgerMenuHeight] = useState(0);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [isLoadingGoogleDataFetch, setIsLoadingGoogleDataFetch] =
    useState<boolean>(false);

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

  useEffect(() => {
    const checkGoogleLogin = async () => {
      setIsLoadingGoogleDataFetch(true);
      if (user.isGoogleLogin && userDetails) {
        const { userName, email, _id } = userDetails;

        dispatch(setUser({ _id, email, userName }));
        dispatch(setToken("google-login-token"));
      }
      setIsLoadingGoogleDataFetch(false);
    };

    checkGoogleLogin();
  }, [dispatch, user.isGoogleLogin, googleLoginMutate, userDetails]);

  const isLogin = useCallback(() => {
    if (!user._id) {
      setOpenLoginModal(true);

      return false;
    }

    return true;
  }, [user]);

  const handleClickNav = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonId = (e.target as HTMLButtonElement).id;

    if (buttonId !== "about-us" && !isLogin()) return;

    navigate(`/${buttonId}`, { replace: location.pathname === `/${buttonId}` });
  };

  return (
    <div
      className="relative w-full px-4 py-5 sm:px-10 sm:py-10"
      ref={headerRef}
    >
      <div
        className={`w-full bg-white ${openHamburgerMenu && "absolute top-0 left-0 flex flex-col z-20 px-4 py-5 sm:px-10 sm:py-10"}`}
        style={openHamburgerMenu ? { height: `${hamburgerMenuHeight}px` } : {}}
      >
        <header className="w-full bg-white grid grid-cols-2 lg:grid-cols-[1fr_3fr_3fr] xl:grid-cols-[1fr_1fr_1fr] gap-2 justify-items-center items-center">
          <i
            className="w-full flex justify-start items-center"
            onClick={() => {
              navigate("/");
              setOpenHamburgerMenu(false);
            }}
          >
            <Logo className="w-[8.5rem] h-4 lg:w-[10.5rem] lg:h-5" />
          </i>
          <div className="hidden lg:flex bg-white justify-center h-[50px] w-[360px] xl:w-[500px] px-6 border border-[#CCCCCC] rounded-full overflow-hidden items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none h-full px-1 placeholder:text-[#161616]"
              onChange={(e) => setSearch && setSearch(e.target.value)}
              value={search}
            />
            <i className="h-6 w-6 flex justify-center items-center cursor-pointer">
              <SearchIcon className="w-6 h-6" />
            </i>
          </div>
          <div className="hidden lg:flex w-full items-center justify-end gap-2.5 shrink-0 text-base leading-5">
            <button
              className="px-1 py-0.5 shrink-0"
              onClick={() => navigate("/")}
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
                id={user._id ? "my-account" : "login"}
                onClick={handleClickNav}
              >
                {user._id ? "My Account" : "Log In"}
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
              onClick={() => navigate("/")}
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
                id={user._id ? "my-account" : "login"}
                onClick={handleClickNav}
              >
                {user._id ? "My Account" : "Log In"}
              </button>
            )}
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

      {openLoginModal && (
        <LoginModal
          onClose={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
        />
      )}
      {openSignupModal && (
        <SignupModal
          onClose={setOpenSignupModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
    </div>
  );
};

export default Header;
