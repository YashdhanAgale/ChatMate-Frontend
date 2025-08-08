import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageInput from "./MessageInput";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ChatWindow({ waId, onBack }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (waId) fetchMessages(waId);
  }, [waId]);

  const fetchMessages = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/conversations/${id}/messages`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (text) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/conversations/${waId}/messages`,
        { text }
      );
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Sending message failed", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-white px-4 py-3 border-b font-semibold text-lg flex items-center gap-2">
        <button className="md:hidden mr-2" onClick={onBack}>
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        {waId ? `Chat with ${waId}` : "Select a chat to start messaging"}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, i) => {
          const isSent = msg.from === import.meta.env.VITE_PLATFORM_NUMBER;
          return (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-lg ${
                isSent
                  ? "bg-green-100 ml-auto text-right"
                  : "bg-white mr-auto text-left"
              }`}
            >
              <div>{msg.text}</div>
              <div className="text-[10px] text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {waId && <MessageInput onSend={handleSend} />}
    </div>
  );
}
