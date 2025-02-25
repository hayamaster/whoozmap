import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutWithGoogle } from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@/apis/hooks";
import { isGoogleLogin, logout } from "@/redux/userSlice";
import { Header } from "@/components";
import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";

const MyAccountPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [selectedShowingMap, setSelectedShowingMap] =
    useState<string>("my-maps");
  const [clickedSort, setClickedSort] = useState<string>("newest");

  const { mutate: logoutMutate } = usePostLogout();

  const handleClickLogout = async () => {
    if (user.isGoogleLogin) {
      await logoutWithGoogle();
    } else {
      logoutMutate();
    }
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(isGoogleLogin(false));
    navigator("/");
  };

  const handleClickShowingMap = (e: MouseEvent<HTMLDivElement>) => {
    setSelectedShowingMap((e.target as HTMLDivElement).id);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedSort(target.id);
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header />
      <div className="flex flex-col w-full items-center gap-5 h-full py-6 px-10">
        <div className="flex flex-col gap-2.5 items-center justify-center">
          <div
            className={`w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center bg-[#FFE852] text-black text-2xl leading-7`}
          >
            {user.userName[0]}
          </div>
          <div className="grid grid-cols-2 items-center gap-2.5">
            <p className="leading-5 justify-self-end">{user.userName}</p>
            <button className="font-bold text-base" onClick={handleClickLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[30px] w-full">
          <div className="flex gap-10">
            <div
              className={`text-[28px] font-bold leading-[33px] pb-2.5 ${
                selectedShowingMap === "my-maps"
                  ? "text-black border-b-2 border-black"
                  : "text-[#777777]"
              }`}
              id="my-maps"
              onClick={handleClickShowingMap}
            >
              My Maps
            </div>
            <div
              className={`text-[28px] font-bold leading-[33px] pb-2.5 ${
                selectedShowingMap === "saved-maps"
                  ? "text-black border-b-2 border-black"
                  : "text-[#777777]"
              }`}
              id="saved-maps"
              onClick={handleClickShowingMap}
            >
              Saved Maps
            </div>
          </div>
          <div className="flex flex-col w-full gap-5 items-center justify-center">
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
            <div>dis</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
