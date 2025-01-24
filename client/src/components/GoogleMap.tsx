import { useState, useEffect, useRef } from "react";

const GoogleMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();

  console.log(googleMap);

  useEffect(() => {
    if (ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
        center: { lat: 43.6640848, lng: -79.3887719 },
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
    }
  }, []);

  return <div ref={ref} id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default GoogleMap;
