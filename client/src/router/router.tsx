import { createBrowserRouter } from "react-router-dom";
import { Layout, Header } from "@/layout";
import { HomePage, CreateMapPage, AboutUsPage, MyAccountPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          // <Header>
          <HomePage />
          // </Header>
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
      {
        path: "/about-us",
        element: (
          <Header>
            <AboutUsPage />
          </Header>
        ),
      },
      {
        path: "/my-account",
        element: (
          <Header>
            <MyAccountPage />
          </Header>
        ),
      },
    ],
  },
]);

export default router;
