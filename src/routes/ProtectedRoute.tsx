import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const token = Cookies.get("demo_token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
