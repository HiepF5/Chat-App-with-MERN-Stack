import { useEffect, useState } from "react";
import { useSocketContext } from "@context/SocketContext";

const TypingIndicator = () => {
  const { socket } = useSocketContext();
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = ({ fullName }: { fullName: string }) => {
      setTypingUsers((prev) => new Set(prev).add(fullName));
    };

    const handleUserStopTyping = ({ fullName }: { fullName: string }) => {
      setTypingUsers((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(fullName);
        return updatedSet;
      });
    };

    socket.on("USER_TYPING", handleUserTyping);
    socket.on("USER_STOP_TYPING", handleUserStopTyping);

    return () => {
      socket.off("USER_TYPING", handleUserTyping);
      socket.off("USER_STOP_TYPING", handleUserStopTyping);
    };
  }, [socket]);

  if (typingUsers.size === 0) return null; // Nếu không có ai đang nhập, không hiển thị

  return (
    <div className="text-sm text-gray-400 mt-1">
      {[...typingUsers].join(", ")} đang nhập...
    </div>
  );
};

export default TypingIndicator;
