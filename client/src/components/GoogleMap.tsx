import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { INITIAL_MAP_CENTER } from "@/constants";
import { GoogleMapsPlaceType, LatLng } from "@/types";

interface GoogleMapProps {
  setCenter: Dispatch<SetStateAction<LatLng>>;
  fetchedPlaces: GoogleMapsPlaceType[];
  openSearchResultMenu: boolean;
}

interface MarkerType {
  [key: string]: google.maps.marker.AdvancedMarkerElement;
}

const GoogleMap = ({
  setCenter,
  fetchedPlaces,
  openSearchResultMenu,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<MarkerType>({});

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
    if (mapRef.current && !googleMap) {
      const initialMap = new window.google.maps.Map(mapRef.current, {
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

  useEffect(() => {
    if (googleMap && fetchedPlaces) {
      const newMarkerInstances: MarkerType = {};

      // remove markers that are not in fetchedPlaces
      Object.keys(markerRef.current).forEach((key) => {
        const existingMarker = markerRef.current[key];

        if (!fetchedPlaces.find((place) => place.placeId === key)) {
          existingMarker.map = null;
        } else {
          newMarkerInstances[key] = existingMarker;
        }
      });

      // add new markers
      fetchedPlaces.forEach((place) => {
        if (!newMarkerInstances[place.placeId]) {
          const blackPin = new window.google.maps.marker.PinElement({
            background: "#000",
            borderColor: "#000",
            glyphColor: "white",
          });

          const markerInstance =
            new window.google.maps.marker.AdvancedMarkerElement({
              position: { lat: place.lat, lng: place.lng },
              map: googleMap,
              title: place.name,
              content: blackPin.element,
            });

          newMarkerInstances[place.placeId] = markerInstance;
        }
      });

      markerRef.current = newMarkerInstances;
      googleMap.setZoom(14);
    }
  }, [googleMap, fetchedPlaces]);

  useEffect(() => {
    if (googleMap && !openSearchResultMenu) {
      Object.keys(markerRef.current).forEach((key) => {
        const existingMarker = markerRef.current[key];

        existingMarker.map = null;
      });
    }
  }, [googleMap, openSearchResultMenu]);

  return (
    <div ref={mapRef} id="map" style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default GoogleMap;
