import useGetConversation from "@hooks/useGetConversation";
import Conversation from "./Conversation";
import { getRandomEmoji } from "@utils/emoji";
import { IUser } from "@interface/user.interface";

const Conversations = () => {
  const {
    loading,
    conversations,
  }: { loading: boolean; conversations: IUser[] } = useGetConversation();
  console.log("conversations", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? <span className="loading loading-spinner"></span> : null}

      {conversations?.map((conversation: IUser, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={index === conversations.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
