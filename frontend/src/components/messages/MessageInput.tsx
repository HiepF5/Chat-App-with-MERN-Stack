import { useAuthContext } from "@context/AuthContext";
import { useSocketContext } from "@context/SocketContext";
import useSendMessage from "@hooks/useSendMessage";
import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import TypingIndicator from "./TypingIndicator";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  const { socket } = useSocketContext();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { authUser } = useAuthContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (socket && authUser?._id) {
      socket.emit("TYPING", {
        fullName: authUser.fullName,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("STOP_TYPING", { fullName: authUser.fullName });
      }, 1000);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={handleInputChange}
        />
        <TypingIndicator />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
