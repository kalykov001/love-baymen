"use client";
import { useState } from "react";
import "./memoryButton.css";
import ModalVideo from "@/shared/modalVideo/ModalVideo";

export default function MemoryButton({ onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ paddingBlock: "60px" }}>
      {/* Кнопка */}
      {!open && (
        <div className="memory-trigger" onClick={() => setOpen(true)}>
          Открыть Воспоминание💚✨
        </div>
      )}

      {/* Модальное окно */}
      {open && (
        <ModalVideo
          visible={open}
          onClose={() => setOpen(false)}
          src="https://drive.google.com/file/d/16so-u3sKEK5biXG_v24-L5JCKrgrk70g/preview"
        />
      )}
    </div>
  );
}
