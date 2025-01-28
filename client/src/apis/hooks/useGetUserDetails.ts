import { useSuspenseQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

const useGetUserDetails = () => {
  const getUserDetails = async () => {
    const response = await apiClient.get("/api/user-details");

    return response.data.data;
  };

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  return { data, refetch };
};

export default useGetUserDetails;
