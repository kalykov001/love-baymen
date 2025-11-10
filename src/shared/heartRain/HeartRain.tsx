"use client";
import { useEffect, useState } from "react";
import "./heartRain.css";

interface Heart {
  id: number;
  left: number;
  emoji: string;
  size: number;
  duration: number;
}

export default function HeartsRain() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const heartsArray = [
    "🤍", "🤎", "❤️", "💓", "💚", "💜", "💛", "💙",
    "🩵", "🩶", "🩷", "🧡", "🖤", "💕", "❣️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * window.innerWidth,
        emoji: heartsArray[Math.floor(Math.random() * heartsArray.length)],
        size: 16 + Math.random() * 24,         // размер сердца
        duration: 3000 + Math.random() * 2000, // длительность падения
      };

      setHearts(prev => [...prev, newHeart]);

      // удаляем сердца старше 5 секунд
      setHearts(prev => prev.filter(h => Date.now() - h.id < 5000));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: `${heart.duration}ms`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}