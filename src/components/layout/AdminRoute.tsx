import { Navigate } from "react-router-dom";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";
import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(useCurrentUser);
  if (!token) {
    return <Navigate to="/admin/login" replace={true} />;
  }
  if (currentUser && currentUser?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default AdminRoute;
