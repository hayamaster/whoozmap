import { useEffect, useState, MouseEvent, useCallback, useRef } from "react";
import { useGetListItems, useGetUserDetails } from "@/apis/hooks";
import { Logo, SearchIcon, SaveIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { likeToThousandsUnit } from "@/utils";
import { LoginModal, SignupModal } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { getUserWithGoogle } from "@/appwrite/auth";

interface ListItem {
  _id: string;
  title: string;
  userName: string;
  imageUrl: string;
  updatedAt: string;
  likeCount: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { data } = useGetListItems();
  const { data: userDetails } = useGetUserDetails();

  const [search, setSearch] = useState<string>("");
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [clickedSort, setClickedSort] = useState<string>("newest");
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [isCategoryCentered, setIsCategoryCentered] = useState<boolean>(true);

  const categoryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWidth = () => {
      if (categoryContainerRef.current) {
        const containerWidth = categoryContainerRef.current.offsetWidth;
        const buttons = Array.from(categoryContainerRef.current.children);
        const buttonsWidth = buttons.reduce(
          (acc, btn) => acc + (btn as HTMLButtonElement).offsetWidth,
          0
        );
        const totalGap = 10 * (buttons.length - 1);

        setIsCategoryCentered(containerWidth > buttonsWidth + totalGap);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  console.log("redux", user);
  console.log("userDetails", userDetails);

  useEffect(() => {
    const checkGoogleLogin = async () => {
      if (user.isGoogleLogin) {
        const userData = await getUserWithGoogle();

        dispatch(
          setUser({
            _id: userData?.$id,
            email: userData?.email,
            userName: userData?.name,
          })
        );
      }
    };

    checkGoogleLogin();

    if (userDetails && userDetails.logout) {
      dispatch(logout());
    }
    if (userDetails && userDetails._id) {
      dispatch(setUser(userDetails));
    }
  }, [userDetails, dispatch, user.isGoogleLogin]);

  const isLogin = useCallback(() => {
    if (!user._id) {
      setOpenLoginModal(true);

      return false;
    }

    return true;
  }, [user]);

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedCategory(target.id);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedSort(target.id);
  };

  const handleClickLogin = () => {
    if (!user._id) {
      setOpenLoginModal(true);
    }
  };

  const handleClickNav = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonId = (e.target as HTMLButtonElement).id;

    if (!isLogin()) return;

    navigate(buttonId);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="w-full h-full flex flex-col items-center">
      <header className="w-full grid grid-cols-[2fr_5fr_5fr] lg:grid-cols-[2fr_3fr_3fr] xl:grid-cols-[1fr_1fr_1fr] gap-2 justify-items-center items-center">
        <i className="w-full flex justify-start items-center">
          <Logo className="w-[7.25rem] h-6" />
        </i>
        <div className="bg-white flex justify-center h-[50px] w-[360px] xl:w-[500px] px-6 border border-[#CCCCCC] rounded-full overflow-hidden items-center">
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
        <div className="flex w-full items-center justify-end gap-2.5 shrink-0 text-xs lg:text-base lg:leading-5">
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
            id={user._id ? "my-account" : "login"}
            onClick={handleClickNav}
          >
            {user._id ? "My Account" : "Log In"}
          </button>
          <button
            className="bg-[#FFE852] px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-semibold shrink-0"
            id="create-map"
            onClick={handleClickNav}
          >
            Create a Map
          </button>
        </div>
      </header>

      <div className="flex w-full h-full overflow-y-scroll flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center text-3xl md:text-[3.25rem] md:leading-[62.93px] xl:text-[4rem] xl:leading-[77.45px] font-bold py-10">
          <h1>Find out people's favorite</h1>
          <h1>places on maps!</h1>
        </div>

        <div className="flex flex-col w-full gap-10 items-center sticky top-0 bg-white z-10">
          <div
            className={`flex w-full gap-2.5 items-center overflow-x-scroll ${isCategoryCentered && "justify-center"}`}
            ref={categoryContainerRef}
          >
            <Button
              onClick={handleCategoryClick}
              id="all"
              variant={`${clickedCategory === "all" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              All
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="eats-drinks"
              variant={`${clickedCategory === "eats-drinks" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Eats & Drinks
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="dates"
              variant={`${clickedCategory === "dates" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Dates
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="hangouts"
              variant={`${clickedCategory === "hangouts" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Hangouts
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="shops"
              variant={`${clickedCategory === "shops" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Shops
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="adventures"
              variant={`${clickedCategory === "adventures" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Adventures
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="relaxations"
              variant={`${clickedCategory === "relaxations" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Relaxations
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="attractions"
              variant={`${clickedCategory === "attractions" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Attractions
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="celebrations"
              variant={`${clickedCategory === "celebrations" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Celebrations
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="others"
              variant={`${clickedCategory === "others" ? "default" : "outline"}`}
              className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
            >
              Others
            </Button>
          </div>
          <div className="flex gap-1 items-center w-full justify-end">
            <Button
              onClick={handleSortClick}
              id="newest"
              variant="ghost"
              className={`text-base leading-5 font-normal py-0 px-3 ${clickedSort === "newest" ? "text-black" : "text-gray-400"}`}
            >
              Newest
            </Button>
            <div className="border-r border-[#EDEDED] h-[12px]" />
            <Button
              onClick={handleSortClick}
              id="popular"
              variant="ghost"
              className={`text-base leading-5 font-normal py-0 px-3 ${clickedSort === "popular" ? "text-black" : "text-gray-400"}`}
            >
              Most Popular
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 w-full h-full gap-3 items-center justify-items-center pt-10 pb-4">
          {data &&
            data.map((item: ListItem) => (
              <div
                key={item._id}
                className="rounded-xl w-72 h-[412px] overflow-hidden flex flex-col gap-px"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-72 h-72 object-cover rounded-xl"
                />
                <div className="flex justify-between items-center w-full pt-2.5 pb-1">
                  <h2 className="font-bold text-xl">{item.title}</h2>
                  <SaveIcon className="w-6 h-6" />
                </div>
                <p className="text-[#444444] text-sm">{item.userName}</p>
                <p className="text-[#444444] text-sm">
                  {String(item.updatedAt).split("T")[0]}
                </p>
                <p className="text-[#444444] text-sm">
                  {likeToThousandsUnit(item.likeCount)}
                </p>
              </div>
            ))}
        </div>
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
    </main>
  );
};

export default HomePage;
