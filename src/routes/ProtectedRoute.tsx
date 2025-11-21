import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../redux/store";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.authSlice.isAuthenticated);
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin"  />;
};

export default ProtectedRoute;