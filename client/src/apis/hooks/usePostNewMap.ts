import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";
import { GoogleMapsPlaceType } from "@/types";

interface PostNewMapProps {
  title: string;
  description: string;
  category: string[];
  thumbnailUrl: string;
  places: GoogleMapsPlaceType[];
  userId: string;
}

const usePostNewMap = () => {
  const postNewMap = async (data: PostNewMapProps) => {
    return await apiClient.post("/api/create-map", data);
  };

  return useMutation({ mutationFn: postNewMap });
};

export default usePostNewMap;
