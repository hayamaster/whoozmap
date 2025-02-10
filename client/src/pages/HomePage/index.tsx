import { useEffect, useState, MouseEvent, useCallback } from "react";
import { useGetListItems, useGetUserDetails } from "@/apis/hooks";
import { SaveIcon } from "@/assets/icons";
import { likeToThousandsUnit } from "@/utils";
import { LoginModal, SignupModal } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { getUserWithGoogle } from "@/appwrite/auth";
import { Header, FilterOptions } from "./components";

interface ListItem {
  _id: string;
  title: string;
  userName: string;
  imageUrl: string;
  updatedAt: string;
  likeCount: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { data } = useGetListItems();
  const { data: userDetails } = useGetUserDetails();

  const [search, setSearch] = useState<string>("");
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [clickedSort, setClickedSort] = useState<string>("newest");
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [isLoadingGoogleDataFetch, setIsLoadingGoogleDataFetch] =
    useState<boolean>(false);

  console.log("redux", user);
  console.log("userDetails", userDetails);

  useEffect(() => {
    const checkGoogleLogin = async () => {
      setIsLoadingGoogleDataFetch(true);
      if (user.isGoogleLogin) {
        const userData = await getUserWithGoogle();

        if (userData) {
          dispatch(
            setUser({
              _id: userData?.$id,
              email: userData?.email,
              userName: userData?.name,
            })
          );
        }
      }
      setIsLoadingGoogleDataFetch(false);
    };

    checkGoogleLogin();

    if (userDetails && userDetails.logout) {
      dispatch(logout());
    }
    if (userDetails && userDetails._id) {
      dispatch(setUser(userDetails));
    }
  }, [userDetails, dispatch, user.isGoogleLogin]);

  const isLogin = useCallback(() => {
    if (!user._id) {
      setOpenLoginModal(true);

      return false;
    }

    return true;
  }, [user]);

  const handleClickLogin = () => {
    if (!user._id) {
      setOpenLoginModal(true);
    }
  };

  const handleClickNav = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonId = (e.target as HTMLButtonElement).id;

    if (!isLogin()) return;

    navigate(buttonId);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="w-full h-full flex flex-col items-center px-4 py-5 sm:px-10 sm:py-10">
      <Header
        search={search}
        setSearch={setSearch}
        handleClickLogin={handleClickLogin}
        handleClickNav={handleClickNav}
        userId={user._id}
        isLoadingGoogleDataFetch={isLoadingGoogleDataFetch}
      />

      <div className="flex w-full h-full overflow-y-scroll flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center text-2xl mobile:text-3xl md:text-[3.25rem] md:leading-[62.93px] xl:text-[4rem] xl:leading-[77.45px] font-bold pt-10 pb-4">
          <h1>Find out people's favorite</h1>
          <h1>places on maps!</h1>
        </div>

        <FilterOptions
          clickedCategory={clickedCategory}
          setClickedCategory={setClickedCategory}
          clickedSort={clickedSort}
          setClickedSort={setClickedSort}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 w-full h-full gap-4 sm:gap-5 items-center justify-items-center pt-5">
          {data &&
            data.map((item: ListItem) => (
              <div
                key={item._id}
                className="rounded-t-2xl w-full h-auto aspect-[10/13.5] flex flex-col gap-2"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-2xl"
                />
                <div className="flex justify-between items-center w-full pt-1">
                  <h2 className="font-bold text-xl leading-5 truncate">
                    {item.title}
                  </h2>
                  <SaveIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#444444] text-sm leading-4">
                    {item.userName}
                  </p>
                  <p className="text-[#444444] text-sm leading-4">
                    {String(item.updatedAt).split("T")[0]}
                  </p>
                  <p className="text-[#444444] text-sm leading-4">
                    {likeToThousandsUnit(item.likeCount)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {openLoginModal && (
        <LoginModal
          onClose={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
        />
      )}
      {openSignupModal && (
        <SignupModal
          onClose={setOpenSignupModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
    </main>
  );
};

export default HomePage;
