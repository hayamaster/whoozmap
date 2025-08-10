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

interface CreateMapResponse {
  message: string;
  success: boolean;
  data: {
    mapId: string;
  };
}

const usePostNewMap = () => {
  const postNewMap = async (data: PostNewMapProps) => {
    const response = await apiClient.post<CreateMapResponse>(
      "/api/create-map",
      data
    );
    return response;
  };

  return useMutation({ mutationFn: postNewMap });
};

export default usePostNewMap;
