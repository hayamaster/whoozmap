import { account, OAuthProvider } from "./appwrite";

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      "https://www.whoozmap.com/",
      "http://localhost:3000"
    );
  } catch (error) {
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
    console.error(error);
  }
};
