import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};
interface Props {
  children: ReactNode;
}

export const SocketContextProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
