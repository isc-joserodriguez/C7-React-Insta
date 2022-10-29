import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const PUBLIC_ROUTES = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    title: "Login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    title: "Register",
    element: <RegisterPage />,
  },
];
