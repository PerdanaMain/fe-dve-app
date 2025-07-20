import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import DashboardLayout from "../components/layouts/dashboard-layout";
import Dashboard from "../pages/equipments";
import RegisteredUser from "../pages/admin/registered-user";
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
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/registered-users",
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
        element: <RegisteredUser />,
      },
    ],
  },
]);

export default router;
