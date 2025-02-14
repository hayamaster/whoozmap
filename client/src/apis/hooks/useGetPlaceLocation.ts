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

  const { data, refetch } = useQuery({
    queryKey: ["placeLocation", searchPlace],
    queryFn: getPlaceLocation,
    enabled: !!searchPlace,
  });

  return { data, refetch };
};

export default useGetPlaceLocation;
