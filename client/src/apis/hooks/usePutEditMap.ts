import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";
import { GoogleMapsPlaceType } from "@/types";

interface PutMapProps {
  title: string;
  description: string;
  category: string[];
  thumbnailUrl: string;
  places: GoogleMapsPlaceType[];
  userId: string;
  mapId: string;
}

const usePutEditMap = () => {
  const putEditMap = async (data: PutMapProps) => {
    return await apiClient.put("/api/edit-map", data);
  };

  return useMutation({ mutationFn: putEditMap });
};

export default usePutEditMap;
