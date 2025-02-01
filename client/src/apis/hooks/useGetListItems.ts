import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

const useGetListItems = () => {
  const getListItems = async () => {
    const response = await apiClient.get("/api");

    return response.data.data;
  };

  const { data } = useSuspenseQuery({
    queryKey: ["listItems"],
    queryFn: async () => await getListItems(),
  });

  return { data };
};

export default useGetListItems;
