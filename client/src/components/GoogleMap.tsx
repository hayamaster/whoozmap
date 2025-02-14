import { useState, useEffect, useRef } from "react";
import { useGetPlaceLocation } from "@/apis/hooks";

interface GoogleMapProps {
  debouncedSearch: string;
}

const GoogleMap = ({ debouncedSearch }: GoogleMapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [lat, setLat] = useState(43.6640848);
  const [lng, setLng] = useState(-79.3887719);
  const [center, setCenter] = useState<google.maps.LatLng | null>(null);

  const { data } = useGetPlaceLocation({
    searchPlace: debouncedSearch,
    lat: center?.lat() || lat,
    lng: center?.lng() || lng,
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
          setCenter(newCenter);
        }
      });
    }
  }, [lat, lng, googleMap]);

  // setCenter on the map
  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter({ lat, lng });
    }
  }, [lat, lng, googleMap]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div ref={ref} id="map" style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default GoogleMap;
