import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

const usePostLogout = () => {
  const postLogout = async () => {
    const response = await apiClient.post("/api/logout");

    return response.data.data;
  };

  return useMutation({ mutationFn: postLogout });
};

export default usePostLogout;
