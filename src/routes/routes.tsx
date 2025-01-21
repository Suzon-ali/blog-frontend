import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../components/ui/Admin/Dashboard";
import AllBlogs from "../pages/AllBlogs";
import AllUser from "../pages/AllUsers";
import AdminRoute from "../components/layout/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "all-blogs",
        element: (
          <AdminRoute>
            <AllBlogs />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUser />,
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
