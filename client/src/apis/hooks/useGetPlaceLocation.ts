import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface Request {
  searchPlace: string;
  lat: number;
  lng: number;
}

const useGetPlaceLocation = ({ searchPlace, lat, lng }: Request) => {
  const getPlaceLocation = async () => {
    const response = await apiClient.get(
      `/api/place-location/${searchPlace}/${lat}/${lng}`
    );

    return response.data.data;
  };

  const { data, refetch, isRefetching } = useQuery({
    queryKey: ["placeLocation"],
    queryFn: getPlaceLocation,
    enabled: !!searchPlace,
    staleTime: 30 * 60 * 1000,
  });

  return { data, refetch, isRefetching };
};

export default useGetPlaceLocation;
