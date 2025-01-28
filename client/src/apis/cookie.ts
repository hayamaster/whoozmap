import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key: string, value: string, options?: object) => {
  return cookies.set(key, value, { path: "/", ...options });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string, options: object) => {
  return cookies.remove(key, { path: "/", ...options });
};
