import useGetConversation from "@hooks/useGetConversation";
import useConversation from "@store/useConversation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search query must be at least 3 characters");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
	if (conversation) {
	  setSelectedConversation(conversation);
	  setSearch("");
	}
	else {
	  toast.error("No user found");
	}
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
