import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { HomePage, CreateMapPage } from "../pages";

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
    ],
  },
]);

export default router;
