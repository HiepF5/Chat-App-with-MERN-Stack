import { IUser } from "@interface/user.interface";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authUser: IUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  console.log("2");
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<IUser | null>(() => {
    const user = localStorage.getItem("chat-user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
