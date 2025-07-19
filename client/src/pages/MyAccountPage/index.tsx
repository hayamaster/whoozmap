import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@/apis/hooks";
import { isGoogleLogin, logout } from "@/redux/userSlice";
import { Header } from "@/components";
import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useGetMapList } from "@/apis/hooks";
import { SaveIcon } from "@/assets/icons";
import { MapList } from "@/types";
import { savedCountToThousandsUnit } from "@/utils";
import { SettingMenu } from "./components";

const MyAccountPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [selectedShowingMap, setSelectedShowingMap] =
    useState<string>("my-maps");
  const [clickedSort, setClickedSort] = useState<string>("newest");
  const { mutate: logoutMutate } = usePostLogout();
  const { data: myMaps } = useGetMapList({ userId: user._id });

  const handleClickLogout = async () => {
    logoutMutate();
    dispatch(logout());
    dispatch(isGoogleLogin(false));
    localStorage.removeItem("token");
    await navigator("/");
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
      <div className="flex flex-col w-full items-center gap-5 max-h-full h-full overflow-hidden py-6 px-10">
        <div className="flex flex-col gap-2.5 items-center w-full">
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
        <div className="flex flex-col items-center overflow-hidden h-full gap-[30px] w-full">
          <div className="flex gap-10">
            <div
              className={`text-xl md:text-[28px] font-bold leading-[33px] pb-2.5 cursor-pointer ${
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
              className={`text-xl md:text-[28px] font-bold leading-[33px] pb-2.5 cursor-pointer ${
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
          <div className="flex flex-col w-full max-h-full items-center overflow-hidden">
            <div className="flex gap-1 h-fit items-center w-full justify-end">
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

            {selectedShowingMap === "my-maps" && (
              <div className="max-h-full shrink overflow-y-scroll grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 w-full gap-4 sm:gap-5 items-center justify-items-center pt-5">
                {myMaps &&
                  myMaps
                    .sort((a: MapList, b: MapList) =>
                      clickedSort === "newest"
                        ? Number(new Date(b.updatedAt)) -
                          Number(new Date(a.updatedAt))
                        : a.savedCount && b.savedCount
                    )
                    .map((item: MapList) => (
                      <div
                        key={item.mapId}
                        className="rounded-t-2xl w-full h-auto aspect-[10/13.5] flex flex-col gap-2"
                      >
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full aspect-square object-cover rounded-2xl cursor-pointer"
                          onClick={() => navigator(`/map/${item.mapId}`)}
                        />
                        <div className="flex justify-between items-center w-full pt-1">
                          <h2
                            className="font-bold text-xl leading-5 truncate cursor-pointer"
                            onClick={() => navigator(`/map/${item.mapId}`)}
                          >
                            {item.title}
                          </h2>
                          <div className="flex gap-1 sm:gap-2 xl:gap-2.5">
                            <SaveIcon className="w-6 h-6" />
                            <SettingMenu />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-[#444444] text-sm leading-4">
                            {item.userName}
                          </p>
                          <p className="text-[#444444] text-sm leading-4">
                            {String(item.updatedAt).split("T")[0]}
                          </p>
                          <p className="text-[#444444] text-sm leading-4">
                            {item.savedCount
                              ? savedCountToThousandsUnit(item.savedCount)
                              : 0}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
