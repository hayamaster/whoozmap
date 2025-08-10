import { useEffect, useState } from "react";
import { useGetMapList } from "@/apis/hooks";
import { SaveIcon } from "@/assets/icons";
import { savedCountToThousandsUnit } from "@/utils";
import { FilterOptions } from "./components";
import { Header } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearMapCreateSuccess } from "@/redux/mapSlice";
import { MapList } from "@/types";
import clappingImage from "@/assets/images/clapping.png";
import noImage from "@/assets/images/no-image.png";
import paperAirplane from "@/assets/images/paper-airplane.png";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks";
import toast from "react-hot-toast";

const HomePage = () => {
  const { data } = useGetMapList({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { mapCreateSuccess, createdMapId } = useSelector(
    (state: RootState) => state.map
  );

  const [search, setSearch] = useState<string>("");
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [clickedSort, setClickedSort] = useState<string>("newest");
  const [showMapCreateSuccessModal, setShowMapCreateSuccessModal] =
    useState<boolean>(false);
  const [clickShareLink, setClickShareLink] = useState<boolean>(false);

  useEffect(() => {
    if (mapCreateSuccess) {
      setShowMapCreateSuccessModal(true);
    }
  }, [mapCreateSuccess]);

  const handleShareClick = () => {
    const shareUrl = `https://whoozmap.com/map/${createdMapId}`;

    if (isMobile) {
      navigator
        .share({
          title: "Check out this map!",
          url: shareUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("Link copied successfully!");
        })
        .catch(() => {
          toast.error("Failed to copy link.");
        });
    }

    setClickShareLink(true);
  };

  const handleCloseMapCreateSuccessModal = () => {
    setShowMapCreateSuccessModal(false);
    dispatch(clearMapCreateSuccess());
    setClickShareLink(false);
  };

  return (
    <main className="w-full h-full flex flex-col items-center">
      <Header search={search} setSearch={setSearch} />
      <div className="flex w-full h-full overflow-y-scroll flex-col items-center px-4 pb-5 sm:px-10 sm:pb-10">
        <div className="w-full flex flex-col justify-center items-center text-2xl mobile:text-3xl md:text-[3.25rem] md:leading-[62.93px] xl:text-[4rem] xl:leading-[77.45px] font-bold pt-10 pb-4">
          <h1>Find out people's favorite</h1>
          <h1>places on maps!</h1>
        </div>

        <FilterOptions
          clickedCategory={clickedCategory}
          setClickedCategory={setClickedCategory}
          clickedSort={clickedSort}
          setClickedSort={setClickedSort}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 w-full gap-4 sm:gap-5 items-center justify-items-center pt-5">
          {data &&
            data
              .filter((map: MapList) =>
                clickedCategory === "all"
                  ? map
                  : map.category.includes(clickedCategory)
              )
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
                    src={item.thumbnailUrl || noImage}
                    alt={item.title}
                    className="w-full aspect-square object-cover rounded-2xl cursor-pointer"
                    onClick={() => navigate(`/map/${item.mapId}`)}
                  />
                  <div className="flex justify-between items-center w-full pt-1">
                    <h2
                      className="font-bold text-xl truncate cursor-pointer"
                      onClick={() => navigate(`/map/${item.mapId}`)}
                    >
                      {item.title}
                    </h2>
                    <SaveIcon className="w-6 h-6" />
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
      </div>
      {showMapCreateSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-dvh bg-black bg-opacity-20 z-40 flex justify-center items-center">
          <div className="fixed w-full h-full sm:w-fit sm:h-fit sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 flex flex-col bg-white sm:rounded-xl px-4 py-10 sm:py-12 sm:px-16 md:py-[60px] md:px-[80px] z-50 items-center justify-center">
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-10">
              {clickShareLink ? (
                <img
                  src={paperAirplane}
                  alt="share link"
                  className="w-[151px] h-[80px] mx-auto"
                />
              ) : (
                <img
                  src={clappingImage}
                  alt="success"
                  className="w-[150px] h-[100px] mx-auto"
                />
              )}
              <div className="flex flex-col items-center justify-center font-bold text-2xl leading-[29px] md:text-4xl md:leading-[43.5px]">
                <p>Thank you for</p>
                <p>sharing your map!</p>
              </div>

              <div className="w-full flex flex-col gap-2 sm:gap-2.5">
                <button
                  className="w-full sm:static bg-[#FFE852] rounded-full py-4 px-8 font-semibold leading-5"
                  onClick={handleShareClick}
                >
                  Share Link
                </button>
                <button
                  className="w-full sm:static bg-[#EDEDED] rounded-full py-4 px-8 font-semibold leading-5"
                  onClick={handleCloseMapCreateSuccessModal}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
