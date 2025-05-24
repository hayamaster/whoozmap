import { useLocation } from "react-router-dom";
import { useGetMapDetail } from "@/apis/hooks";
import { GoogleMapsPlaceType } from "@/types";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { blackPin, yellowPin } from "@/assets/icons";
import { INITIAL_MAP_OPTION } from "@/constants";

const MapPage = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [selectedPlace, setSelectedPlace] = useState<GoogleMapsPlaceType>();

  const location = useLocation();
  const mapId = location.pathname.split("/")[2];
  const { data } = useGetMapDetail({ mapId });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter({
        lat: data.places[0].lat,
        lng: data.places[0].lng,
      });
      setSelectedPlace(data.places[0]);
    }
  }, [googleMap, data]);

  const handleClickPlaced = (place: GoogleMapsPlaceType) => {
    if (googleMap) {
      googleMap.panTo({ lat: place.lat, lng: place.lng });
      setSelectedPlace(place);
    }
  };

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            onLoad={(map) => {
              setGoogleMap(map);
            }}
            options={INITIAL_MAP_OPTION}
            mapContainerStyle={{ width: "100%", height: "100vh" }}
          >
            {data &&
              data.places.map((place: GoogleMapsPlaceType) => (
                <MarkerF
                  key={place.placeId}
                  position={{ lat: place.lat, lng: place.lng }}
                  title={place.name}
                  icon={
                    place.placeId == selectedPlace?.placeId
                      ? yellowPin
                      : blackPin
                  }
                  onClick={() => handleClickPlaced(place)}
                />
              ))}
          </GoogleMap>
          {data.places.length > 0 && (
            <div className="absolute bottom-0 z-10 flex w-full cursor-pointer flex-row gap-2.5 overflow-scroll px-3 py-3 md:right-0 md:top-0 md:h-full md:w-fit md:flex-col md:py-5 md:gap-3.5">
              {data.places.map((place: GoogleMapsPlaceType) => (
                <div
                  key={place.placeId}
                  // onMouseOver={handleFocusInfo}
                  // onMouseLeave={() => setFocusId(0)}
                  onClick={() => handleClickPlaced(place)}
                  id={String(place.placeId)}
                  className="group flex min-w-[15rem] max-w-[20rem] flex-col justify-start gap-2 rounded-2xl border border-[#FFDD00] bg-white px-3 py-2 shadow-xl hover:bg-[#FFDD00] hover:duration-200 md:px-4 md:py-3"
                >
                  <h1 className="text-base text-[#FFDD00] font-semibold group-hover:text-white md:text-xl">
                    {place.name}
                  </h1>
                  <p className="truncate text-sm text-gray-400 group-hover:text-gray-500 md:text-base">
                    {place.location}
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-gray-700 group-hover:text-gray-100 md:text-base">
                    {place.description?.replace(/\\n/g, "\n")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MapPage;
