import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { errorToast } from "../redux/actions/toaster";

const ProtectedRoutes = () => {
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  if (!user) {
    errorToast("Accesso negato effettua il login.");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
