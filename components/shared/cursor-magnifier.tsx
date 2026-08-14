"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The small magnifying-glass cursor that follows the pointer,
 * matching the reference site. Hidden on touch devices and
 * while the pointer is idle.
 */
export default function CursorMagnifier() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const loop = () => {
      curX += (targetX - curX) * 0.35;
      curY += (targetY - curY) * 0.35;
      if (ref.current) {
        ref.current.style.transform = `translate(${curX - 13}px, ${curY - 13}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[9000] opacity-0 transition-opacity duration-150 [will-change:transform] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="drop-shadow-sm">
        <circle cx="10.5" cy="10.5" r="7" stroke="#16140f" strokeWidth="2.5" fill="rgba(251,250,245,0.55)" />
        <line x1="15.8" y1="15.8" x2="23" y2="23" stroke="#16140f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="8.4" cy="8.2" r="2.1" fill="rgba(251,250,245,0.85)" />
      </svg>
    </div>
  );
}
