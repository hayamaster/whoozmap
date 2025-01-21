import { CloseIcon, GoogleLoginIcon } from "@/assets/icons";
import { MouseEvent } from "react";
import { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import { checkEmailPattern, checkUserNamePattern } from "@/utils";
import { usePostRegister, usePostLogin } from "@/apis/hooks";
import toast from "react-hot-toast";
import { loginWithGoogle } from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/userSlice";
import { useQueryClient } from "@tanstack/react-query";

interface SignupModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
}

const SignupModal = ({ onClose, setOpenLoginModal }: SignupModalProps) => {
  const { mutate: registerMutate } = usePostRegister();
  const { mutate: loginMutate } = usePostLogin();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [validUserName, setValidUserName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validRePassword, setValidRePassword] = useState(true);
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { isValidUserName } = checkUserNamePattern({ userName });
    const { isValidEmail } = checkEmailPattern({ email });

    setValidUserName(isValidUserName);
    setValidEmail(isValidEmail);
    setValidPassword(password !== "" ? true : false);
    setValidRePassword(rePassword === password ? true : false);

    if (
      isValidUserName &&
      isValidEmail &&
      password !== "" &&
      rePassword === password
    ) {
      registerMutate(
        { userName, email, password },
        {
          onSuccess: () => {
            toast.success("User created successfully");
            console.log("User created successfully");

            // sign up success, then login
            loginMutate(
              { email, password },
              {
                onSuccess: (res) => {
                  dispatch(setToken(res.data.token));
                  localStorage.setItem("token", res.data.token);
                  queryClient.invalidateQueries({ queryKey: ["userDetails"] });
                  onClose(false);
                },
                onError: (error) => {
                  console.log(error);
                },
              }
            );
          },
          onError: (error) => {
            setDuplicatedEmail(true);
            console.log(error);
          },
        }
      );
    }
  };

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose(false);
    setOpenLoginModal(true);
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();

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
        <h1 className="text-xl font-bold py-3 sm:py-6 sm:text-2xl">Sign up</h1>

        <form className="flex flex-col py-2 gap-2">
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="email" className="text-sm font-bold flex gap-1">
              <span>Username</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="username"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
              className={`border rounded-lg py-2 px-4 focus:outline-none ${validUserName ? "border-[#cccccc]" : "border-red-400"}`}
            />
            {!validUserName && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Letters and numbers only, 2-8 characters
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="email" className="flex gap-1 text-sm font-bold">
              <span>Email</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email-signup"
              autoComplete="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className={`border rounded-lg py-2 px-4 focus:outline-none ${validEmail && !duplicatedEmail ? "border-[#cccccc]" : "border-red-400"}`}
            />
            {!validEmail && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Please enter a valid email address
              </p>
            )}
            {validEmail && duplicatedEmail && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Email already exists
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="password" className="flex gap-1 text-sm font-bold">
              <span>Password</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              id="password-signup"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className={`border rounded-lg py-2 px-4 focus:outline-none ${validPassword ? "border-[#cccccc]" : "border-red-400"}`}
            />
            {!validPassword && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Please fill out this field
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="password" className="flex gap-1 text-sm font-bold">
              <span>Re-enter Password</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              id="re-password-signup"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRePassword(e.target.value)
              }
              className={`border rounded-lg py-2 px-4 focus:outline-none ${validRePassword ? "border-[#cccccc]" : "border-red-400"}`}
            />
            {!validRePassword && (
              <p className="text-red-400 text-xs 2xl:text-sm">
                Please enter the same password
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 py-6">
            <button
              type="button"
              className="w-full bg-[#ffe852] py-2 rounded-full text-sm lg:text-base font-semibold xl:py-2.5"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border border-[#cccccc] py-2 rounded-full text-sm font-semibold lg:text-base xl:py-2.5"
              onClick={handleLoginWithGoogle}
            >
              <GoogleLoginIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              <p>Sign up with Google</p>
            </button>
          </div>

          <div className="flex w-full gap-1 justify-center items-center text-[#161616] text-xs xl:text-sm">
            <p>Already have an account?</p>
            <button
              type="button"
              className="font-bold"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
