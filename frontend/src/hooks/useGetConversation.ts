import { IUser } from "@interface/user.interface";
import api from "@lib/axios/axiosInterceptor";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState<IUser[]>([]);
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/users");
                setConversations(res.data);
                setLoading(false);
            }
            catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("An unknown error occurred");
                }
            }
            finally {
                setLoading(false);
            }
        }
        getConversations();
    }, []);
    return { loading, conversations };
}
export default useGetConversation;
