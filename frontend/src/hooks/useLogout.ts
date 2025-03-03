import { useAuthContext } from "@context/AuthContext";
import api from "@lib/axios/axiosInterceptor";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/logout");
      if (res.status === 200) {
        toast.success("Logged out successfully");
      }
      //localStorage
      localStorage.removeItem("chat-user");
      //context
      setAuthUser(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
