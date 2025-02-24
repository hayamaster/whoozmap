import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutWithGoogle } from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@/apis/hooks";
import { isGoogleLogin, logout } from "@/redux/userSlice";
import { Header } from "@/components";

const MyAccountPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logoutMutate } = usePostLogout();

  const handleClickLogout = async () => {
    if (user.isGoogleLogin) {
      await logoutWithGoogle();
    } else {
      logoutMutate();
    }
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(isGoogleLogin(false));
    navigator("/");
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header />
      <div className="flex flex-col items-center gap-10 h-full py-6">
        <div className="flex flex-col gap-2.5 items-center justify-center">
          <div
            className={`w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center bg-[#FFE852] text-black`}
          >
            {user.userName[0]}
          </div>
          <div className="grid grid-cols-2 items-center gap-2.5">
            <p className="leading-5 justify-self-end">{user.userName}</p>
            <button className="font-bold text-base" onClick={handleClickLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
