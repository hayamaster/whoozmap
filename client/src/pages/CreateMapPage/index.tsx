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
import { LatLng, MapCreateMetaDataType, GoogleMapsPlaceType } from "@/types";

const render = (
  status: Status,
  setCenter: Dispatch<SetStateAction<LatLng>>,
  fetchedPlaces: GoogleMapsPlaceType[],
  openSearchResultMenu: boolean
) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Failed to load Google Maps</div>;
    case Status.SUCCESS:
      return (
        <GoogleMap
          setCenter={setCenter}
          fetchedPlaces={fetchedPlaces}
          openSearchResultMenu={openSearchResultMenu}
        />
      );
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
  const [openSearchResultMenu, setOpenSearchResultMenu] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<GoogleMapsPlaceType>();
  const [placeDescription, setPlaceDescription] = useState<string>("");
  const [addedPlaces, setAddedPlaces] = useState<GoogleMapsPlaceType[]>([]);

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

  const handleCloseSearchMenu = async () => {
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
      placesRefetch();
    }
  };

  const handleSelectPlace = (place: GoogleMapsPlaceType) => {
    setSelectedPlace(place);
    setPlaceDescription("");
  };

  const handleAddPlace = (selectedPlace: GoogleMapsPlaceType) => {
    setAddedPlaces((prev) => [
      ...prev,
      { ...selectedPlace, description: placeDescription },
    ]);
  };

  useEffect(() => {
    console.log("data", fetchedPlaces);
  }, [fetchedPlaces]);

  return (
    <div className="w-screen h-dvh flex flex-col">
      {showCreateMapDetailsModal && (
        <CreateMapDetailsModal
          onClose={setShowCreateMapDetailsModal}
          mapData={mapData}
          setMapData={setMapData}
        />
      )}
      <div className="relative grid grid-rows-[40%,1fr] sm:grid-rows-none sm:grid-cols-2 lg:grid-cols-[500px,1fr] w-full h-dvh">
        <div className="relative overflow-hidden order-last sm:order-first h-full w-full flex flex-col z-10 bg-white">
          {isRefetching && <Loading size="2xl" />}
          <div
            className={`relative flex flex-col h-full max-h-full w-full px-4 sm:px-10 gap-7 sm:${openSearchResultMenu ? "gap-5 py-7 sm:py-10" : "gap-10 pt-7 sm:pt-10"}`}
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
                <div className="max-h-full w-full flex flex-col gap-2.5 overflow-y-scroll">
                  {fetchedPlaces &&
                    fetchedPlaces
                      .filter(
                        (place: GoogleMapsPlaceType) =>
                          !addedPlaces
                            .map((place) => place.placeId)
                            .includes(place.placeId)
                      )
                      .map((place: GoogleMapsPlaceType) => {
                        return (
                          <div
                            onClick={() => handleSelectPlace(place)}
                            key={place.placeId}
                            className={`flex flex-col gap-4 p-5 border rounded-lg ${selectedPlace?.placeId === place.placeId ? "border-[#161616]" : "border-[#CCCCCC]"}`}
                          >
                            <div className="flex flex-col gap-4">
                              <div className="flex gap-3">
                                {place.icon ? (
                                  <img
                                    src={place.icon}
                                    className="w-12 h-12 shrink-0 border border-[#D9D9D9] rounded-md"
                                  />
                                ) : (
                                  <div className="w-12 h-12 shrink-0 bg-[#D9D9D9] rounded-md" />
                                )}
                                <div className="w-full flex flex-col gap-1">
                                  <h2 className="text-[#161616] font-bold leading-5 text-ellipsis line-clamp-1">
                                    {place.name}
                                  </h2>
                                  <h3 className="text-[#777777] leading-5 text-ellipsis line-clamp-1">
                                    {place.location}
                                  </h3>
                                </div>
                              </div>
                              {selectedPlace?.placeId === place.placeId && (
                                <textarea
                                  onChange={(e) =>
                                    setPlaceDescription(e.target.value)
                                  }
                                  placeholder="Tell us what you like about this place!"
                                  className="w-full resize-none focus:outline-none"
                                  name="description"
                                  id={place.placeId}
                                />
                              )}
                            </div>
                            {selectedPlace?.placeId === place.placeId && (
                              <button
                                className="self-end h-[34px] w-fit rounded-full bg-[#EDEDED] text-[#161616] font-semibold text-sm leading-4 px-4"
                                onClick={() => handleAddPlace(selectedPlace)}
                              >
                                Add
                              </button>
                            )}
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
                      className={`w-full text-base leading-5 text-[#777777] ${showDetailDescription ? "whitespace-pre-line" : "line-clamp-1 text-ellipsis"}`}
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
                <p className="leading-5 font-bold">{`${addedPlaces.length} Places Added`}</p>
                {addedPlaces.length > 0 ? (
                  <div className="w-full flex flex-col flex-grow flex-shrink gap-4 overflow-y-scroll">
                    {addedPlaces.map((place) => (
                      <div
                        className="flex flex-col gap-2.5 p-5 border rounded-lg border-[#CCCCCC]"
                        key={place.placeId}
                      >
                        <div className="flex gap-3">
                          {place.icon ? (
                            <img
                              src={place.icon}
                              className="w-12 h-12 shrink-0 border border-[#D9D9D9] rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 shrink-0 bg-[#D9D9D9] rounded-md" />
                          )}
                          <div className="w-full flex flex-col gap-1">
                            <div className="w-full flex items-center justify-between">
                              <h2 className="text-[#161616] font-bold leading-5 text-ellipsis line-clamp-1">
                                {place.name}
                              </h2>
                              <i
                                className="w-6 h-6"
                                onClick={() =>
                                  setAddedPlaces((prev) =>
                                    prev.filter(
                                      (p) => p.placeId !== place.placeId
                                    )
                                  )
                                }
                              >
                                <CloseIcon className="w-6 h-6" />
                              </i>
                            </div>
                            <h3 className="text-[#777777] leading-5 text-ellipsis line-clamp-1">
                              {place.location}
                            </h3>
                          </div>
                        </div>
                        {place.description && (
                          <p className="text-[#777777] leading-5">
                            {place.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex-grow flex-shrink overflow-y-scroll text-base leading-5 md:text-lg lg:text-xl xl:text-2xl text-[#777777] font-bold sm:leading-7 flex flex-col justify-center items-center">
                    <p>Add your favorite places and</p>
                    <p>create own your map!</p>
                  </div>
                )}

                <div className="flex shrink-0 h-fit w-full pb-7 sm:pb-10">
                  <button
                    className="w-full h-12 rounded-2xl font-semibold leading-5 bg-[#FFE852] disabled:bg-[#EDEDED]"
                    disabled={
                      addedPlaces.length === 0 ||
                      mapData.title === "" ||
                      mapData.categories.length === 0
                    }
                  >
                    Create
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Wrapper
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          render={(status) =>
            render(status, setCenter, fetchedPlaces, openSearchResultMenu)
          }
          libraries={["marker"]}
        />
      </div>
    </div>
  );
};

export default CreateMapPage;
