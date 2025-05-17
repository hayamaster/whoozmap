import { Map } from "./components";
import { useLocation } from "react-router-dom";
import { useGetMapDetail } from "@/apis/hooks";

const MapPage = () => {
  const location = useLocation();
  const mapId = location.pathname.split("/")[2];

  const { data } = useGetMapDetail({ mapId });

  return (
    <>
      <Map fetchedPlaces={data.places} />
    </>
  );
};

export default MapPage;
