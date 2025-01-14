import { createBrowserRouter } from "react-router-dom";
import { Layout, Header } from "@/layout";
import { HomePage, CreateMapPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Header>
            <HomePage />
          </Header>
        ),
      },
      {
        path: "/create-map",
        element: (
          <Header>
            <CreateMapPage />
          </Header>
        ),
      },
    ],
  },
]);

export default router;
