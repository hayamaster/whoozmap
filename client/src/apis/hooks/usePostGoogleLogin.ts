import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";

interface PostGoogleLoginProps {
  googleId: string;
  userName: string;
  email: string;
}

const usePostGoogleLogin = () => {
  const postGoogleLogin = async (data: PostGoogleLoginProps) => {
    const response = await apiClient.post("/api/google-login", data);

    return response.data;
  };

  return useMutation({ mutationFn: postGoogleLogin });
};

export default usePostGoogleLogin;
