import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

const useGetListItems = () => {
  const getListItems = async () => {
    const response = await apiClient.get("/api");

    return response.data.data;
  };

  const { data } = useQuery({
    queryKey: ["listItems"],
    queryFn: () => getListItems(),
  });

  return { data };
};

export default useGetListItems;
