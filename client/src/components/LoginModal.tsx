import { CloseIcon, GoogleLoginIcon } from "@/assets/icons";
import { MouseEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { usePostLogin } from "@/apis/hooks";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken, isGoogleLogin } from "../redux/userSlice";
import { loginWithGoogle } from "@/appwrite/auth";
import { useQueryClient } from "@tanstack/react-query";

interface LoginModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  setOpenSignupModal: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ onClose, setOpenSignupModal }: LoginModalProps) => {
  const { mutate: loginMutate } = usePostLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [validEmailAndPassword, setValidEmailAndPassword] = useState(true);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setEmptyEmail(email == "" ? true : false);
    setEmptyPassword(password == "" ? true : false);

    if (email !== "" && password !== "") {
      loginMutate(
        { email, password },
        {
          onSuccess: async (res) => {
            toast.success("Login successfully");
            dispatch(setToken(res.data.token));
            localStorage.setItem("token", res.data.token);
            queryClient.invalidateQueries({ queryKey: ["userDetails"] });
            setValidEmailAndPassword(true);
            onClose(false);
          },
          onError: (error) => {
            toast.error("Login failed");
            console.log(error);
            setValidEmailAndPassword(false);
          },
        }
      );
    }
  };

  const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose(false);
    setOpenSignupModal(true);
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      dispatch(isGoogleLogin(true));
      localStorage.setItem("token", "google-login");

      onClose(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 sm:p-2 z-20 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="relative flex flex-col w-full h-full bg-white px-4 py-6 z-30 sm:px-12 sm:justify-center sm:rounded-xl sm:w-3/5 sm:h-fit md:w-1/2 lg:w-2/5 xl:px-16 xl:py-8 xl:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-10 right-4 sm:top-4 sm:right-4"
          onClick={() => onClose(false)}
        >
          <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <h1 className="text-xl font-bold py-3 sm:py-6 sm:text-2xl">Log in</h1>

        <form className="flex flex-col py-2 gap-2">
          {!validEmailAndPassword && (
            <p className="text-red-400 text-xs 2xl:text-sm">
              Incorrect email or password
            </p>
          )}
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <input
              type="email-login"
              id="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded-lg py-2 px-4 focus:outline-none ${emptyEmail ? "border-red-400" : "border-[#cccccc]"}`}
            />
            {emptyEmail && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Please fill out this field
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="password" className="text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded-lg py-2 px-4 focus:outline-none ${emptyPassword ? "border-red-400" : "border-[#cccccc]"}`}
            />
            {emptyPassword && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Please fill out this field
              </p>
            )}
          </div>
          <div className="flex justify-start items-center py-1">
            <button
              type="button"
              className="text-xs font-semibold text-[#777777] xl:text-sm"
            >
              Forget your password?
            </button>
          </div>

          <div className="flex flex-col gap-2 py-6">
            <button
              type="button"
              className="w-full bg-[#ffe852] py-2 rounded-full text-sm lg:text-base font-semibold xl:py-2.5"
              onClick={handleLoginClick}
            >
              Log in
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border border-[#cccccc] py-2 rounded-full text-sm font-semibold lg:text-base xl:py-2.5"
              onClick={handleLoginWithGoogle}
            >
              <GoogleLoginIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              <p>Log in with Google</p>
            </button>
          </div>

          <div className="flex w-full gap-1 justify-center items-center text-[#161616] text-xs xl:text-sm">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="font-bold"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
