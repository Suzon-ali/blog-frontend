import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { ReactNode } from "react";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useCurrentToken;
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
