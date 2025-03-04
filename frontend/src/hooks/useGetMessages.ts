import api from "@lib/axios/axiosInterceptor";
import useConversation from "@store/useConversation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                console.log("useGetMessage chạy")
                const res = await api.get(`/api/message/${selectedConversation?._id}`);
                if (res.status === 200) {
                    setMessages(res.data);
                }
                if (res.status === 404) {
                    setMessages([]);
                }
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

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};
export default useGetMessages;
