import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";

interface DeleteMapProps {
  mapId: string;
  userId: string;
}

const useDeleteMap = () => {
  const deleteMap = async (data: DeleteMapProps) => {
    return await apiClient.delete("/api/delete-map", { data });
  };

  return useMutation({ mutationFn: deleteMap });
};

export default useDeleteMap;
