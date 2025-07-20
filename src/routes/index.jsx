import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import DashboardLayout from "../components/layouts/dashboard-layout";
import AdminIndex from "../pages/admin";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../utils/env";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session) {
        throw redirect("/");
      }
      return session;
    },
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminIndex />,
      },
    ],
  },
]);

export default router;
