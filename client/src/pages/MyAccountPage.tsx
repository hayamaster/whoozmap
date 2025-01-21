import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logoutWithGoogle } from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { usePostLogout } from "@/apis/hooks";
import { isGoogleLogin } from "@/redux/userSlice";

const MyAccountPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate } = usePostLogout();

  const handleClickLogout = async () => {
    if (user.isGoogleLogin) {
      await logoutWithGoogle();
      dispatch(isGoogleLogin(false));
    } else {
      logoutMutate();
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    }

    localStorage.clear();
    navigator("/");
  };

  return (
    <div className="flex flex-col items-center gap-10 h-full py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl py-4">My Account</h1>
        <p>
          <span>Email:</span>
          <span className="font-semibold"> {user.email}</span>
        </p>
        <p>
          <span>Username:</span>
          <span className="font-semibold"> {user.userName}</span>
        </p>
      </div>

      <button
        className="bg-[#FFE852] px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl font-semibold"
        onClick={handleClickLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default MyAccountPage;
