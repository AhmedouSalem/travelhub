import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { AdminRoute, ProtectedRoute } from "./ProtectedRoute";
import { MyBookingsPage } from "../features/bookings/MyBookingsPage";
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
import { ServiceDetailPage } from "../features/catalog/pages/ServiceDetailPage";
import { AdminBookingsPage } from "../features/admin/pages/AdminBookingsPage";
import { CatalogPage } from "../features/catalog/pages/CatalogPage";
import { AdminCatalogPage } from "../features/admin/pages/AdminCatalogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CatalogPage />,
  },
  {
    path: "/catalog/:id",
    element: <ServiceDetailPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/my-bookings",
    element: (
      <ProtectedRoute>
        <MyBookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/catalog",
    element: (
      <AdminRoute>
        <AdminCatalogPage />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/bookings",
    element: (
      <AdminRoute>
        <AdminBookingsPage />
      </AdminRoute>
    ),
  },
]);
