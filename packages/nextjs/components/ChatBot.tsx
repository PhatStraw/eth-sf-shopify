"use client";

import React, { useState } from "react";
import Image from "next/image";

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Add user message to chat history
    setChatHistory(prev => [...prev, `User: ${message}`]);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Add bot response to chat history
      setChatHistory(prev => [...prev, `Bot: ${data.response}`]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory(prev => [...prev, "Bot: Sorry, I couldn't process your request."]);
    }

    setMessage("");
  };

  return (
    <div>
      {chatOpen ? (
        <div className="fixed bottom-32 right-4 bg-white rounded-lg shadow-lg w-2/5 h-2/5 max-w-[600px] max-h-[600px] overflow-hidden">
          <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between w-full bg-blue-500 px-2">
              <div className="flex items-center justify-center w-full">
                <Image src="/Chat Robot Icon.png" alt="logo" width={50} height={50} />
                <div className="p-4 text-white font-bold w-full">Chat Bot</div>
              </div>
              <div
                className="py-2 px-3 text-white font-bold hover:cursor-pointer rounded-full bg-white/50"
                onClick={() => setChatOpen(!chatOpen)}
              >
                X
              </div>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              {chatHistory.map((msg, index) => (
                <div key={index} className="mb-2">
                  {msg}
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-9/12 p-2 border rounded-lg"
              />
              <button
                onClick={sendMessage}
                className="ml-2 w-3/12 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-full bg-white/50 p-2 hover:cursor-pointer" onClick={() => setChatOpen(!chatOpen)}>
          <Image src="/Chat Robot Icon.png" alt="logo" width={50} height={50} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
