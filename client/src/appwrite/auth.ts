import { account, OAuthProvider } from "./appwrite";

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      // "https://www.whoozmap.com/",
      "http://localhost:5173",
      "http://localhost:3000"
    );
  } catch (error) {
    console.log("sical");
    console.error(error);
  }
};

export const logoutWithGoogle = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
  }
};

export const getUserWithGoogle = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.log("sival 로그인안돼");
    console.error(error);
  }
};
