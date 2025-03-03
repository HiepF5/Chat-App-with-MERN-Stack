import { IMessage } from "@interface/message.interface";
import { IUser } from "@interface/user.interface";
import { create } from "zustand";

interface ConversationState {
  selectedConversation: IUser | null;
  setSelectedConversation: (selectedConversation: IUser | null) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
