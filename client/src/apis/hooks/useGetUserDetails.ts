import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

const useGetUserDetails = () => {
  const getUserDetails = async () => {
    const response = await apiClient.get("/api/user-details");

    return response.data.data;
  };

  const { data, refetch, isFetching } = useSuspenseQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
    staleTime: 0,
  });

  return { data, refetch, isFetching };
};

export default useGetUserDetails;
