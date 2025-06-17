import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/layout";
import {
  HomePage,
  CreateMapPage,
  AboutUsPage,
  MyAccountPage,
  MapPage,
} from "@/pages";

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
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/my-account",
        element: <MyAccountPage />,
      },
      {
        path: "/map/:id",
        element: <MapPage />,
      },
    ],
  },
]);

export default router;
