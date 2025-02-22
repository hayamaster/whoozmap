import { useEffect, useState } from "react";
import { useGetMapList } from "@/apis/hooks";
import { SaveIcon } from "@/assets/icons";
import { likeToThousandsUnit } from "@/utils";
import { FilterOptions } from "./components";
import { Header } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setMapCreateSuccess } from "@/redux/mapSlice";
import { MapList } from "@/types";
import clappingImage from "@/assets/images/clapping.png";
import noImage from "@/assets/images/no-image.png";

const HomePage = () => {
  const { data } = useGetMapList();
  const dispatch = useDispatch();
  const mapCreateSuccess = useSelector(
    (state: RootState) => state.map.mapCreateSuccess
  );

  const [search, setSearch] = useState<string>("");
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [clickedSort, setClickedSort] = useState<string>("newest");
  const [showMapCreateSuccessModal, setShowMapCreateSuccessModal] =
    useState(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (mapCreateSuccess) {
      setShowMapCreateSuccessModal(true);
      dispatch(setMapCreateSuccess(false));
    }
  }, [mapCreateSuccess, dispatch]);

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
              .map((item: MapList) => (
                <div
                  key={item.mapId}
                  className="rounded-t-2xl w-full h-auto aspect-[10/13.5] flex flex-col gap-2"
                >
                  <img
                    src={item.thumbnailUrl || noImage}
                    alt={item.title}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                  <div className="flex justify-between items-center w-full pt-1">
                    <h2 className="font-bold text-xl leading-5 truncate">
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
                      {item.likeCount ? likeToThousandsUnit(item.likeCount) : 0}
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
              <img
                src={clappingImage}
                alt="success"
                className="w-[150px] h-[100px] mx-auto"
              />
              <div className="flex flex-col items-center justify-center font-bold text-2xl leading-[29px] md:text-4xl md:leading-[43.5px]">
                <p>Thank you for</p>
                <p>sharing your map!</p>
              </div>

              <button
                className="absolute bottom-10 w-full sm:w-fit sm:static bg-[#FFE852] rounded-full py-4 px-8 font-semibold leading-5"
                onClick={() => setShowMapCreateSuccessModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
