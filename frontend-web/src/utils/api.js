import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      // Arahkan ke halaman error 500
      window.location.href = "/error-500";
    }
    return Promise.reject(error);
  }
);

export default api;
