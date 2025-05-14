import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface UseGetMapDetailProps {
  mapId?: string;
}

const useGetMapDetail = ({ mapId = "" }: UseGetMapDetailProps) => {
  const getMapDetail = async () => {
    const response = await apiClient.get(`/api/map-detail?mapId=${mapId}`);

    return response.data.data;
  };

  const { data } = useSuspenseQuery({
    queryKey: ["mapDetail"],
    queryFn: async () => await getMapDetail(),
  });

  return { data };
};

export default useGetMapDetail;
