import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authUser: { id: string; name: string } | null;
  setAuthUser: React.Dispatch<React.SetStateAction<{ id: string; name: string } | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthContextProvider");
	}
	return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [authUser, setAuthUser] = useState<{ id: string; name: string } | null>(() => {
		const user = localStorage.getItem("chat-user");
		return user ? JSON.parse(user) : null;
	});

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
