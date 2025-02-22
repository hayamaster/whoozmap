import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

const useGetMapList = () => {
  const getMapList = async () => {
    const response = await apiClient.get("/api/map-list");

    return response.data.data;
  };

  const { data } = useSuspenseQuery({
    queryKey: ["mapList"],
    queryFn: async () => await getMapList(),
  });

  return { data };
};

export default useGetMapList;
