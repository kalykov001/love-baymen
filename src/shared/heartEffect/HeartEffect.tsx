"use client";

import { useState, useEffect, MouseEvent } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function HeartEffect() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const addHeart = (e: MouseEvent<Document>) => {
    const newHeart: Heart = {
      id: Date.now(),
      x: e.pageX,
      y: e.pageY,
      size: 16 + Math.random() * 32,
    };

    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  useEffect(() => {
    document.addEventListener("click", addHeart as any);
    return () => document.removeEventListener("click", addHeart as any);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            position: "absolute",
            left: heart.x - heart.size / 2 + "px",
            top: heart.y - heart.size / 2 + "px",
            fontSize: heart.size + "px",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 9999,
            animation: "rise 1.5s ease-out forwards",
            transformOrigin: "center",
            display: "inline-block",
          }}
        >
          💖
        </span>
      ))}

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-60px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}