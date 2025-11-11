"use client";
import styles from "./page.module.css";
import OpenChat from "../components/openChat/OpenChat";
import Slider from "../components/slider/Slider";
import LastChat from "../components/lastChat/LastChat";
import MemoryButton from "../components/memoryButton/MemoryButton";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Balloons from "../components/balloons/Balloons";
import TypewriterText from "../components/typewritter/Typewritter";

export default function Home() {
  const [showMemory, setShowMemory] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showRest, setShowRest] = useState(false); // состояние для остальных блоков

  const smoothScrollDown = () => {
    setShowRest(true); // при клике открываем остальные блоки

    const start = window.scrollY;
    const target = start + window.innerHeight; // прокручиваем на высоту экрана
    const duration = 1000;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      // easeOutCubic
      const easing = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start + (target - start) * easing);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const enableSound = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .catch((e) => console.log("Ошибка воспроизведения:", e));
      }
    };
    document.addEventListener("click", enableSound, { once: true });
    document.addEventListener("scroll", enableSound, { once: true });
    document.addEventListener("keydown", enableSound, { once: true });
    return () => {
      document.removeEventListener("click", enableSound);
      document.removeEventListener("scroll", enableSound);
      document.removeEventListener("keydown", enableSound);
    };
  }, []);

  return (
    // <div className={styles.page}>
    //   <audio ref={audioRef} loop>
    //     <source src="/song2.mp3" type="audio/mpeg" />
    //     Ваш браузер не поддерживает аудио.
    //   </audio>

    //   {/* Первая картинка */}
    //   <div onClick={smoothScrollDown} className={styles.img1}>
    //     <Image priority src="/homePhoto.png" fill alt="winter" />
    //   </div>

    //   {/* Слайдер всегда виден */}

    //   {/* Остальные блоки только если showRest === true */}
    //   {showRest && (
    //     <>
    //       <TypewriterText />
    //       <div className={styles.img3}>
    //         <Image fill src="/onePhoto.png" alt="love" style={{objectFit: "cover"}} />
    //       </div>
    //       <Slider />
    //       <div className={styles.img}>
    //         <Image fill src="/photo4.png" alt="love"  style={{objectFit: "cover"}}/>
    //       </div>
    //       <OpenChat />
    //       <div className={styles.img2}>
    //         <Image fill src="/together.png" alt="love"  />
    //       </div>
    //       <Balloons />
    //       {showMemory && (
    //         <MemoryButton onClose={() => setShowMemory(false)} /> // ✅ передаем функцию
    //       )}
    //       <div className={styles.img}>
    //         <Image fill src="/selfi.png" alt="love"  />
    //       </div>
    //       <LastChat />
    //       <div className={styles.img2}>
    //         <Image fill src="/twoPhoto.png" alt="love"  style={{objectFit: "cover"}}/>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className={styles.page}>
  <audio ref={audioRef} loop>
    <source src="/song2.mp3" type="audio/mpeg" />
    Ваш браузер не поддерживает аудио.
  </audio>

  {/* Первая картинка */}
  <div onClick={smoothScrollDown} className={styles.img1}>
    <Image priority src="/homePhoto.png" fill alt="winter" />
    {!showRest && (
      <div className={styles.hint}>Жми любую точку экрана 💌</div>
    )}
  </div>

  {/* Остальные блоки */}
  {showRest && (
    <>
      <TypewriterText />
      <div className={styles.img3}>
        <Image fill src="/onePhoto.png" alt="love" style={{objectFit: "cover"}} />
      </div>
      <Slider />
      <div className={styles.img}>
        <Image fill src="/photo4.png" alt="love" style={{objectFit: "cover"}} />
      </div>
      <OpenChat />
      <div className={styles.img2}>
        <Image fill src="/together.png" alt="love"  />
      </div>
      <Balloons />
      {showMemory && <MemoryButton onClose={() => setShowMemory(false)} />}
      <div className={styles.img}>
        <Image fill src="/selfi2.png" alt="love" />
      </div>
      <LastChat />
      <div className={styles.img2}>
        <Image fill src="/twoPhoto.png" alt="love" style={{objectFit: "cover"}}/>
      </div>
    </>
  )}
</div>
  );
}
