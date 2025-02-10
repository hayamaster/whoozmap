import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";

const usePostLogout = () => {
  const queryClient = useQueryClient();

  const postLogout = async () => {
    const response = await apiClient.post("/api/logout");

    return response.data;
  };

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
  });
};

export default usePostLogout;
