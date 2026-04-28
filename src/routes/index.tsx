import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import OTPPage from "@/pages/auth/OTPPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import HomePage from "@/pages/home/HomePage";
import PricingPage from "@/pages/home/PricingPage";
import TermsPage from "@/pages/home/TermsPage";
import SupportPage from "@/pages/home/SupportPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import ProtectedRoute from "./ProtectedRoute";

import HomeLayout from "@/components/home/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "otp",
        element: <OTPPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "",
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/chat",
        element: <DashboardPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
