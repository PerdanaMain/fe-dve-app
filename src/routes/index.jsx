import { createBrowserRouter, redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import DashboardLayout from "../components/layouts/dashboard-layout";
import RegisteredUser from "../pages/admin/registered-user";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Equipments from "../pages/equipments";
import Overview from "../pages/equipments/overview";
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
        element: <Overview />,
      },
    ],
  },
  {
    path: "/equipments",
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
        element: <Equipments />,
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
