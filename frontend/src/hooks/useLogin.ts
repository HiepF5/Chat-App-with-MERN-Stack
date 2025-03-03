import { useAuthContext } from "@context/AuthContext";
import api from "@lib/axios/axiosInterceptor";
import { useState } from "react";
import toast from "react-hot-toast";
function handleInputErrors(
  username: string,
  password: string,
) {
  if (!username || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (username: string, password: string) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await api.post("/api/auth/login", {
                username,
                password,
            });
            if (res.status === 200) {
                toast.success("Logged in successfully");
            }
            //localStorage
            localStorage.setItem("chat-user", JSON.stringify(res.data));
            //context
            setAuthUser(res.data);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}
export default useLogin;    