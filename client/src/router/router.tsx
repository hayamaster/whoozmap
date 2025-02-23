import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/layout";
import { HomePage, CreateMapPage, AboutUsPage, MyAccountPage } from "@/pages";
import { unLoginLoader } from "./loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create-map",
        element: <CreateMapPage />,
        loader: unLoginLoader,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/my-account",
        element: <MyAccountPage />,
        loader: unLoginLoader,
      },
    ],
  },
]);

export default router;
