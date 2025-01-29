import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { errorToast } from "../redux/actions/toaster";

const ProtectedAdminRoutes = () => {
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  if (user.role !== "ADMIN") {
    errorToast("Accesso negato.");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedAdminRoutes;
