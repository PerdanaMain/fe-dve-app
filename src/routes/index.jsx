import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import DashboardLayout from "../components/layouts/dashboard-layout";
import AdminIndex from "../pages/admin";

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
