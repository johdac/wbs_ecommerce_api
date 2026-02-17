import { createBrowserRouter } from "react-router";
import { DefaultLayout } from "./layout/DefaultLayout";
import { HomePage } from "./pages/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    // ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);
