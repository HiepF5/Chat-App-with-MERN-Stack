import { IUser } from "@interface/user.interface";
import { create } from "zustand";

interface ConversationState {
  selectedConversation: IUser | null;
  setSelectedConversation: (selectedConversation: IUser| null) => void;
  message: string[];
  setMessage: (message: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  message: [],
  setMessage: (message) => set({ message }),
}));

export default useConversation;
