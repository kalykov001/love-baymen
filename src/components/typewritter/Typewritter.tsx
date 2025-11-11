"use client";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import "./typewritter.css";

export default function TypingFeather() {
  const fullText =
    " Ты - как утро после дождя,нежная и светлая. Каждое мгновение рядом с тобой наполняет сердце теплом, а твоя улыбка — моим светом. Люблю тебя больше, чем слова могут передать, и каждый день благодарю судьбу за тебя.";
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Добавляем буквы
useEffect(() => {
  if (displayedText.length > 0) return; // предотвращает повтор
  let i = 0;
  const interval = setInterval(() => {
    if (i < fullText.length) {
      setDisplayedText((prev) => [...prev, fullText[i]]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 100);
  return () => clearInterval(interval);
}, []);

  // Обновляем координаты пера после каждого рендера
  useLayoutEffect(() => {
    const rect = cursorRef.current!.getBoundingClientRect();
    const parentRect =
      cursorRef.current!.parentElement!.getBoundingClientRect();
    setCoords({
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
    });
  }, [displayedText]);

  return (
    <div className="typing-container">
      <div className="text-wrapper">
        <p className="typing-text">
          {displayedText.map((char, i) => (
            <span key={i}>{char}</span>
          ))}
          <span className="cursor-span" ref={cursorRef}></span>
        </p>

        <motion.span
          className="feather"
          animate={{
            x: coords.x,
            y: [0, -2, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            x: { type: "spring", stiffness: 80, damping: 15 },
            rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          🪶
        </motion.span>
      </div>
    </div>
  );
}
