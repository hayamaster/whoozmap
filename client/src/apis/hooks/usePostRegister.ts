import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";

interface PostRegisterProps {
  userName: string;
  email: string;
  password: string;
}

const usePostRegister = () => {
  const postRegister = async (data: PostRegisterProps) => {
    return await apiClient.post("/api/register", data);
  };

  return useMutation({ mutationFn: postRegister });
};

export default usePostRegister;
