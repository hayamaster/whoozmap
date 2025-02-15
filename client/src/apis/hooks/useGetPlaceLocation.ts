import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useState } from "react";

interface Request {
  searchPlace: string;
  lat: number;
  lng: number;
}

const useGetPlaceLocation = ({ searchPlace, lat, lng }: Request) => {
  const [isRefetching, setIsRefetching] = useState(false);

  const getPlaceLocation = async () => {
    const response = await apiClient.get(
      `/api/place-location?searchPlace=${searchPlace}&lat=${lat}&lng=${lng}`
    );

    return response.data.data;
  };

  const { data, refetch } = useQuery({
    queryKey: ["placeLocation"],
    queryFn: getPlaceLocation,
    enabled: !!searchPlace,
    staleTime: 30 * 60 * 1000,
  });

  const handleRefetch = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  return { data, refetch: handleRefetch, isRefetching };
};

export default useGetPlaceLocation;
