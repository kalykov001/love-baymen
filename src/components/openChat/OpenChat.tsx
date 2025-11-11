"use client";
import { useState } from "react";
import Chat from "../../shared/chat/Chat";
import "./openChat.css";

export default function OpenChat() {
  const [chatVisible, setChatVisible] = useState(false);
  const [tapEffect, setTapEffect] = useState(false);

  const handleTap = () => {
    setTapEffect(true);
    setTimeout(() => setTapEffect(false), 400);
    setChatVisible(true);
  };

  return (
    <div className="openchat-container">
      <div className="instruction">Жми, чтобы прочитать 💌</div>
      <div className="mail-wrapper" onClick={handleTap}>
        <div className={`mail-icon ${tapEffect ? "tap" : ""}`}>
          💌
          <span className="badge">1</span>
        </div>
      </div>

      {chatVisible && (
        <Chat visible={chatVisible} onClose={() => setChatVisible(false)} />
      )}
    </div>
  );
}