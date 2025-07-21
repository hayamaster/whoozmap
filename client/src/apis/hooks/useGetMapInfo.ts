import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface UseGetMapListProps {
  userId: string;
  mapId: string;
}

const useGetMapList = ({ userId, mapId }: UseGetMapListProps) => {
  const getMapList = async () => {
    const response = await apiClient.get(
      `/api/map-info?userId=${userId}&mapId=${mapId}`
    );

    return response.data.data;
  };

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["mapInfo", userId, mapId],
    queryFn: async () => await getMapList(),
  });

  return { data, refetch };
};

export default useGetMapList;
