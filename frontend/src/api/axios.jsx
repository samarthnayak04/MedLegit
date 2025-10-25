import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // 👈 always use localhost
  withCredentials: true, // 👈 send cookies (refresh token)
});

// Attach access_token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Use plain axios with the same host (localhost)
        const res = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        // production
        //         const res = await axios.post(
        //   "/auth/refresh",
        //   {},
        //   { withCredentials: true, baseURL: api.defaults.baseURL }
        // );

        const newToken = res.data.access_token;
        localStorage.setItem("access_token", newToken);

        // Update the header for the failed request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/signin"; // redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
