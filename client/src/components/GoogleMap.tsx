import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { INITIAL_MAP_CENTER } from "@/constants";

type LatLng = {
  lat: number;
  lng: number;
};
interface GoogleMapProps {
  setCenter: Dispatch<SetStateAction<LatLng>>;
}

const GoogleMap = ({ setCenter }: GoogleMapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [lat, setLat] = useState(INITIAL_MAP_CENTER.lat);
  const [lng, setLng] = useState(INITIAL_MAP_CENTER.lng);

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

  // initialize google map
  useEffect(() => {
    if (ref.current && !googleMap) {
      const initialMap = new window.google.maps.Map(ref.current, {
        mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
        center: { lat, lng },
        disableDefaultUI: true,
        clickableIcons: false,
        zoom: 16,

        maxZoom: 18,
        gestureHandling: "greedy",
        restriction: {
          latLngBounds: {
            north: 64,
            south: 25,
            east: -53,
            west: -144,
          },
          strictBounds: true,
        },
      });
      setGoogleMap(initialMap);

      initialMap.addListener("bounds_changed", () => {
        const newCenter = initialMap.getCenter();
        if (newCenter) {
          setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
        }
      });
    }
  }, [lat, lng, googleMap, setCenter]);

  // setCenter on the map
  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter({ lat, lng });
    }
  }, [lat, lng, googleMap]);

  return (
    <div ref={ref} id="map" style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default GoogleMap;
