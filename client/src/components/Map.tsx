import { useState, useEffect, useCallback, MutableRefObject } from "react";
import { INITIAL_MAP_CENTER, INITIAL_MAP_OPTION } from "@/constants";
import { GoogleMapsPlaceType, LatLng } from "@/types";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { blackPin, yellowPin, grayPin } from "@/assets/icons";

interface MapProps {
  fetchedPlaces: GoogleMapsPlaceType[];
  openSearchResultMenu: boolean;
  selectedPlace: GoogleMapsPlaceType | undefined;
  centerRef: MutableRefObject<LatLng>;
  addedPlaces: GoogleMapsPlaceType[];
}

const Map = ({
  fetchedPlaces,
  openSearchResultMenu,
  selectedPlace,
  centerRef,
  addedPlaces,
}: MapProps) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [lat, setLat] = useState(INITIAL_MAP_CENTER.lat);
  const [lng, setLng] = useState(INITIAL_MAP_CENTER.lng);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // get user's location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }
    };

    getLocation();
  }, []);

  // setCenter on the map
  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter({ lat, lng });
    }
  }, [lat, lng, googleMap]);

  useEffect(() => {
    if (googleMap && selectedPlace) {
      googleMap.setCenter({ lat: selectedPlace.lat, lng: selectedPlace.lng });
    }
  }, [googleMap, selectedPlace]);

  const onCenterChanged = useCallback(() => {
    const newCenter = googleMap?.getCenter();

    centerRef.current = {
      lat: newCenter?.lat() || INITIAL_MAP_CENTER.lat,
      lng: newCenter?.lng() || INITIAL_MAP_CENTER.lng,
    };
  }, [googleMap, centerRef]);

  return isLoaded ? (
    <GoogleMap
      onCenterChanged={onCenterChanged}
      onLoad={(map) => {
        setGoogleMap(map);
      }}
      options={INITIAL_MAP_OPTION}
      mapContainerStyle={{ width: "100%", height: "100vh" }}
    >
      {openSearchResultMenu &&
        fetchedPlaces &&
        fetchedPlaces
          .filter(
            (place) =>
              !addedPlaces.find(
                (addedPlace) => addedPlace.placeId === place.placeId
              )
          )
          .map((place) => (
            <MarkerF
              key={place.placeId}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
              icon={
                place.placeId == selectedPlace?.placeId ? blackPin : grayPin
              }
            />
          ))}
      {openSearchResultMenu &&
        addedPlaces &&
        addedPlaces.map((place) => (
          <MarkerF
            key={place.placeId}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
            icon={
              place.placeId == selectedPlace?.placeId ? blackPin : yellowPin
            }
          />
        ))}
      {!openSearchResultMenu &&
        addedPlaces.map((place) => (
          <MarkerF
            key={place.placeId}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
            icon={
              place.placeId == selectedPlace?.placeId ? blackPin : yellowPin
            }
          />
        ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
