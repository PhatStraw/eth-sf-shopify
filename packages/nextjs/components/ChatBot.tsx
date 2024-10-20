"use client";

import React, { useState } from "react";
import Image from "next/image";

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
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
              <div className="py-2 px-3 text-white font-bold hover:cursor-pointer rounded-full bg-white/50">X</div>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">{/* Chat messages will go here */}</div>
            <div className="p-4 border-t">
              <input type="text" placeholder="Type your message..." className="w-full p-2 border rounded-lg" />
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
