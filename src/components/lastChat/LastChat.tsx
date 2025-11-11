"use client";
import { useState } from "react";
import ChatAnswer from "../../shared/chatAnswer/ChatAnswer";
import "./lastChat.css";

export default function LastChat() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <div className="lastchat-page">
      <div className="mainbek">
        <button className="btn magical-btn" onClick={() => setChatVisible(true)}>
          💌 Нажми, чтобы ответить
        </button>
      </div>

      {chatVisible && (
        <div className="fade-in">
          <ChatAnswer visible={chatVisible} onClose={() => setChatVisible(false)} />
        </div>
      )}
    </div>
  );
}
