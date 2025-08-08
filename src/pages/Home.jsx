import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { getConversations } from "../services/api";

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await getConversations();
      setConversations(res.data);
    } catch (err) {
      console.error("Error fetching conversations", err);
    }
  };

  const handleBack = () => setSelectedId(null);

  return (
    <div className="flex h-full w-full">
      <div
        className={`${
          selectedId ? "hidden md:block" : "block"
        } w-full md:w-[30%] border-r border-gray-300`}
      >
        <ChatList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      <div
        className={`${
          selectedId ? "block" : "hidden md:block"
        } w-full md:w-[70%]`}
      >
        <ChatWindow waId={selectedId} onBack={handleBack} />
      </div>
    </div>
  );
}
