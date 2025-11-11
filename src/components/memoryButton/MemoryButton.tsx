"use client";
import { useState, useEffect } from "react";
import "./memoryButton.css";
import ModalVideo from "@/shared/modalVideo/ModalVideo";

interface MemoryButtonProps {
  onClose: () => void;
}

export default function MemoryButton({ onClose }: MemoryButtonProps) {
  const [open, setOpen] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  // Генерация частиц при клике
  const createParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      x,
      y,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 120 + 120}, 70%, 60%)`,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 1.5) * 4,
      life: Math.random() * 30 + 30,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.dx,
            y: p.y + p.dy,
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      {/* Частицы */}
      <div className="particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: p.life / 50,
            }}
          ></div>
        ))}
      </div>

      {!open && (
        <div
          className="memory-trigger glow explode"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            createParticles(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2
            );
            setOpen(true);
          }}
        >
          💚 Открыть Воспоминание ✨
        </div>
      )}

      {open && (
        <div className="fade-in">
          <ModalVideo
            visible={open}
            onClose={() => setOpen(false)}
            src="https://drive.google.com/file/d/1mFLeDDFlbM61ty0R54SA1WpXKQ0qq9C3/preview"
          />
        </div>
      )}
    </div>
  );
}