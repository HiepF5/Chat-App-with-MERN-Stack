import axios, { AxiosInstance } from "axios";
import { toast } from "react-hot-toast";

const api:AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (nếu cần)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      // Server phản hồi lỗi (4xx, 5xx)
      if (error.response) {
        const errorMessage = error.response.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      }
      // Không kết nối được với server
      else if (error.request) {
        toast.error("Network error. Please check your connection.");
      }
      // Lỗi khác (ví dụ: request bị chặn, cấu hình sai)
      else {
        toast.error(error.message || "An unknown error occurred.");
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
  }
);

export default api;
