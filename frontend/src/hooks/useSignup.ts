import api from "@lib/axios/axiosInterceptor";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "@context/AuthContext";
function handleInputErrors(
  fullName: string,
  username: string,
  password: string,
  confirmPassword: string,
  gender: string
) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
  ) => {
    const success = handleInputErrors(
      fullName,
      username,
      password,
      confirmPassword,
      gender
    );
    if (!success) return;
    setLoading(true);
    try {
      const res = await api.post("/api/auth/signup", {
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      });

      if (res.status === 201) {
        toast.success("Account created successfully");
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
  };
  return { loading, signup };
};

export default useSignup;
