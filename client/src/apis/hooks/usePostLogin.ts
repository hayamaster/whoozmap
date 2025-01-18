import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";

interface PostLoginProps {
  email: string;
  password: string;
}

const usePostLogin = () => {
  const postLogin = async (data: PostLoginProps) => {
    return await apiClient.post("/api/login", data);
  };

  return useMutation({ mutationFn: postLogin });
};

export default usePostLogin;
