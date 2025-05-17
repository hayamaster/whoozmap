import { useState, useEffect } from "react";
import { GoogleMapsPlaceType } from "@/types";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { blackPin, yellowPin } from "@/assets/icons";
import { INITIAL_MAP_OPTION } from "@/constants";

interface MapProps {
  fetchedPlaces: GoogleMapsPlaceType[];
}

const Map = ({ fetchedPlaces }: MapProps) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [selectedPlace, setSelectedPlace] = useState<GoogleMapsPlaceType>();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  console.log(fetchedPlaces);

  // Set initial center on the map
  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter({
        lat: fetchedPlaces[0].lat,
        lng: fetchedPlaces[0].lng,
      });
      setSelectedPlace(fetchedPlaces[0]);
    }
  }, [googleMap, fetchedPlaces]);

  const handleClickPlaced = (place: GoogleMapsPlaceType) => {
    if (googleMap) {
      googleMap.panTo({ lat: place.lat, lng: place.lng });
      setSelectedPlace(place);
    }
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={(map) => {
        setGoogleMap(map);
      }}
      options={INITIAL_MAP_OPTION}
      mapContainerStyle={{ width: "100%", height: "100vh" }}
    >
      {fetchedPlaces &&
        fetchedPlaces.map((place) => (
          <MarkerF
            key={place.placeId}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
            icon={
              place.placeId == selectedPlace?.placeId ? blackPin : yellowPin
            }
            onClick={() => handleClickPlaced(place)}
          />
        ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
