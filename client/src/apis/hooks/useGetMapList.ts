import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface UseGetMapListProps {
  userId?: string;
}

const useGetMapList = ({ userId = "" }: UseGetMapListProps) => {
  const getMapList = async () => {
    const response = await apiClient.get(`/api/map-list?userId=${userId}`);

    return response.data.data;
  };

  const { data } = useSuspenseQuery({
    queryKey: ["mapList"],
    queryFn: async () => await getMapList(),
  });

  return { data };
};

export default useGetMapList;
