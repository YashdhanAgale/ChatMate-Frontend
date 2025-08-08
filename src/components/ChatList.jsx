import React from "react";

export default function ChatList({ conversations, selectedId, onSelect }) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="px-4 py-3 font-bold text-xl bg-[#00a884] text-white">
        WhatsApp Clone
      </div>

      {conversations.map((chat) => (
        <div
          key={chat.wa_id}
          className={`px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
            selectedId === chat.wa_id ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => onSelect(chat.wa_id)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">{chat.wa_id}</h3>
            <span className="text-xs text-gray-500">
              {new Date(chat.lastTimestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {chat.lastMessage || "No messages yet"}
          </p>
        </div>
      ))}
    </div>
  );
}
