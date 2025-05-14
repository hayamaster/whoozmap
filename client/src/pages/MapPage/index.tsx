import { Map } from "./components";
import { INITIAL_MAP_CENTER } from "@/constants";
import { useRef } from "react";
import { LatLng } from "@/types";
import { useLocation } from "react-router-dom";
import { useGetMapDetail } from "@/apis/hooks";

const MapPage = () => {
  const location = useLocation();
  const mapId = location.pathname.split("/")[2];

  const { data } = useGetMapDetail({ mapId });

  console.log(data);

  const centerRef = useRef<LatLng>({
    lat: INITIAL_MAP_CENTER.lat,
    lng: INITIAL_MAP_CENTER.lng,
  });

  console.log(mapId);
  return (
    <>
      <div>imsy</div>
      <Map
        //   fetchedPlaces={fetchedPlaces}
        //   openSearchResultMenu={openSearchResultMenu}
        //   selectedPlace={selectedPlace}
        //   addedPlaces={addedPlaces}
        centerRef={centerRef}
      />
    </>
  );
};

export default MapPage;
