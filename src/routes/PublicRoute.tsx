import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authSlice.isAuthenticated
  );

  // Nếu đã đăng nhập, chuyển hướng về trang chủ
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;