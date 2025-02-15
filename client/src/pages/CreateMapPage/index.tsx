import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, Loading } from "@/components";
import { SearchIcon, DetailArrowIcon, CloseIcon } from "@/assets/icons";
import {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { CreateMapDetailsModal } from "./components";
import { useGetPlaceLocation } from "@/apis/hooks";
import { INITIAL_MAP_CENTER } from "@/constants";

type LatLng = {
  lat: number;
  lng: number;
};

interface MapCreateMetaDataType {
  title: string;
  description: string;
  thumbnailUrl: string;
  categories: string[];
}

interface GoogleMapsPlaceType {
  name: string;
  placeId: string;
  lat: number;
  lng: number;
  icon: string;
  location: string;
}

const render = (
  status: Status,
  setCenter: Dispatch<SetStateAction<LatLng>>
) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Failed to load Google Maps</div>;
    case Status.SUCCESS:
      return <GoogleMap setCenter={setCenter} />;
  }
};

const CreateMapPage = () => {
  const [search, setSearch] = useState<string>("");
  const [showCreateMapDetailsModal, setShowCreateMapDetailsModal] =
    useState(false);
  const [showDetailDescription, setShowDetailDescription] = useState(false);
  const [mapData, setMapData] = useState<MapCreateMetaDataType>({
    title: "",
    description: "",
    thumbnailUrl: "",
    categories: [],
  });
  const [center, setCenter] = useState<LatLng>({
    lat: INITIAL_MAP_CENTER.lat,
    lng: INITIAL_MAP_CENTER.lng,
  });
  const [searchedData, setSearchedData] = useState([]);
  const [openSearchResultMenu, setOpenSearchResultMenu] = useState(false);

  const {
    data: fetchedPlaces,
    isRefetching,
    refetch: placesRefetch,
  } = useGetPlaceLocation({
    searchPlace: search,
    lat: center.lat,
    lng: center.lng,
  });

  const preventReload = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventReload);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventReload);
    };
  }, [preventReload]);

  useEffect(() => {
    setShowCreateMapDetailsModal(false);
  }, []);

  const handleClickEdit = () => {
    setShowCreateMapDetailsModal((prev) => !prev);
  };

  const handleClickDetailDescription = () => {
    setShowDetailDescription((prev) => !prev);
  };

  const handleCloseSearchMenu = () => {
    setOpenSearchResultMenu(false);
    setSearch(() => "");
  };

  const handleSubmitSearchPlace = (
    e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) => {
    if (
      (e as KeyboardEvent<HTMLInputElement>).key === "Enter" ||
      e.type === "click"
    ) {
      setOpenSearchResultMenu(true);
      if (search !== "") {
        placesRefetch().then((res) => {
          setSearchedData(res.data);
        });
      } else {
        setSearchedData([]);
      }
    }
  };

  useEffect(() => {
    console.log("data", fetchedPlaces);
  }, [fetchedPlaces]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {showCreateMapDetailsModal && (
        <CreateMapDetailsModal
          onClose={setShowCreateMapDetailsModal}
          mapData={mapData}
          setMapData={setMapData}
        />
      )}
      <div className="relative grid grid-rows-[40%,1fr] sm:grid-rows-none sm:grid-cols-2 lg:grid-cols-[500px,1fr] w-full h-dvh">
        <div className="relative order-last sm:order-first h-full w-full flex flex-col z-10 bg-white">
          {isRefetching && <Loading size="2xl" />}
          <div
            className={`relative flex flex-col h-full w-full pt-7 sm:pt-10 px-4 sm:px-10 gap-7 sm:${openSearchResultMenu ? "gap-5" : "gap-10"}`}
          >
            <div className="flex fixed top-0 left-0 sm:static mx-4 mt-4 sm:mx-0 sm:mt-0 bg-white justify-center h-[50px] shrink-0 w-[calc(100%-32px)] sm:w-full px-5 border border-[#CCCCCC] rounded-full overflow-hidden items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none h-full px-1 placeholder:text-[#161616]"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handleSubmitSearchPlace(e)}
                value={search}
              />
              <div className="flex gap-2.5">
                <i
                  className="h-6 w-6 flex justify-center items-center cursor-pointer"
                  onClick={(e) =>
                    handleSubmitSearchPlace(e as MouseEvent<HTMLButtonElement>)
                  }
                >
                  <SearchIcon className="w-6 h-6" />
                </i>
                {openSearchResultMenu && (
                  <i className="h-6 w-6 flex justify-center items-center cursor-pointer">
                    <CloseIcon
                      className="w-6 h-6"
                      onClick={handleCloseSearchMenu}
                    />
                  </i>
                )}
              </div>
            </div>
            {openSearchResultMenu ? (
              <>
                <p className="font-bold leading-5">Results</p>
                <div className="flex flex-col gap-2.5">
                  {searchedData.length > 0 &&
                    searchedData.map((place: GoogleMapsPlaceType) => {
                      return (
                        <div
                          key={place.placeId}
                          className="flex gap-3 items-center"
                        >
                          <div>{place.name}</div>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 shrink-0 bg-[#D9D9D9] rounded-md">
                      {mapData.thumbnailUrl && (
                        <img
                          src={mapData.thumbnailUrl}
                          className="w-full h-full object-cover overflow-hidden rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-base font-bold leading-5">
                        {mapData.title || "Map Title"}
                      </h1>
                      <p className="text-base leading-5 text-[#777777]">
                        {mapData.categories.join(", ") || "Category"}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full gap-1 items-center">
                    <p
                      className={`w-full text-base leading-5 text-[#777777] text-ellipsis ${!showDetailDescription && "line-clamp-1"}`}
                    >
                      {mapData.description || "Description"}
                    </p>
                    <i
                      className="h-6 w-6 flex justify-center items-center cursor-pointer"
                      onClick={handleClickDetailDescription}
                    >
                      <DetailArrowIcon
                        className={`w-6 h-6 transform transition-transform duration-300 ${showDetailDescription && "-rotate-180"}`}
                      />
                    </i>
                  </div>
                  <button
                    className="w-full h-[34px] rounded-2xl bg-[#EDEDED] font-semibold"
                    type="button"
                    onClick={handleClickEdit}
                  >
                    Edit
                  </button>
                </div>
                <p className="leading-5 font-bold">0 Places Added</p>
                <div className="w-full flex-grow flex-shrink overflow-y-scroll text-base leading-5 md:text-lg lg:text-xl xl:text-2xl text-[#777777] font-bold sm:leading-7 flex flex-col justify-center items-center">
                  <p>Add your favorite places and</p>
                  <p>create own your map!</p>
                </div>
                <div className="flex shrink-0 h-fit w-full py-7 sm:py-10">
                  <button className="w-full h-12 bg-[#EDEDED] rounded-2xl font-semibold leading-5">
                    Create
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Wrapper
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          render={(status) => render(status, setCenter)}
          libraries={["marker"]}
        />
      </div>
    </div>
  );
};

export default CreateMapPage;
