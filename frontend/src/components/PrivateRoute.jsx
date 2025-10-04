import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("access_token");

  // If user has token → allow
  // If not → redirect to signin
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
