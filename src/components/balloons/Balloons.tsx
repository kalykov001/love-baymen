"use client";
import { useState } from "react";
import "./balloons.css";

const offers = [
  { id: 1, text: "Моя радость начинается там, где ты." },
  { id: 2, text: "Ты — мое вдохновение и покой одновременно." },
  { id: 3, text: "Ты мое маленькое чудо в этом мире." },
  { id: 4, text: "Люблю тебя больше, чем слова могут сказать." },
  { id: 5, text: "Ты делаешь мой мир ярче с каждым днём." },
];

export default function Balloons() {
  const [popped, setPopped] = useState<number | null>(1);

  return (
    <div className="sky">
      {offers.map((offer, i) => (
        <div
          key={offer.id}
          className={`balloon balloon-${i} ${popped === offer.id ? "popped" : ""}`}
          onClick={() => setPopped(offer.id)}
        >
          <div className="shape">
            {popped !== offer.id && <span className="inside-text">Лопни меня ❤️</span>}
          </div>
          <div className="string"></div>

          {popped === offer.id && (
            <div className="popped-container">
              <div className="offer-text">{offer.text}</div>
            </div>
          )}

          {popped === offer.id && <div className="sparkles"></div>}
        </div>
      ))}
    </div>
  );
}