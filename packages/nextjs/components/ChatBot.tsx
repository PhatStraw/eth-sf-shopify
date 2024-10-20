"use client";

import React, { useState } from "react";
import Image from "next/image";

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="rounded-full bg-white/50 p-2 hover:cursor-pointer" onClick={() => setChatOpen(!chatOpen)}>
      {chatOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg w-2/5 h-2/5 max-w-[600px] max-h-[600px] overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="p-4 bg-blue-500 text-white font-bold">Chat Bot</div>
            <div className="flex-grow p-4 overflow-y-auto">{/* Chat messages will go here */}</div>
            <div className="p-4 border-t">
              <input type="text" placeholder="Type your message..." className="w-full p-2 border rounded-lg" />
            </div>
          </div>
        </div>
      )}
      <Image src="/Chat Robot Icon.png" alt="logo" width={50} height={50} />
    </div>
  );
};

export default ChatBot;
