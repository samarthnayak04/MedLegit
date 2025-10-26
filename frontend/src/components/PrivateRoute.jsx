import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }

      try {
        // Try refreshing access token
        const res = await api.post("/auth/refresh");
        const newToken = res.data.access_token;
        localStorage.setItem("access_token", newToken);
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/signin" />;
}
