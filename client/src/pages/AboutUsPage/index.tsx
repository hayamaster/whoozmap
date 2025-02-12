import { Header } from "./components";
import { MouseEvent, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginModal, SignupModal } from "@/components";

const AboutUsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

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

    if (!isLogin() || location.pathname === `/${buttonId}`) return;

    navigate(`/${buttonId}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <Header
        handleClickLogin={handleClickLogin}
        handleClickNav={handleClickNav}
        userId={user._id}
      />
      <h1 className="text-2xl">About Us</h1>
      <p>Our mission is to provide the various maps to our customers.</p>
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
    </div>
  );
};

export default AboutUsPage;
