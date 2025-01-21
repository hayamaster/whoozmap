import { redirect } from "react-router-dom";

const unLoginLoader = (): Response | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/");
  }

  return null;
};

export { unLoginLoader };
