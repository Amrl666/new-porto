"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The date in the masthead's meta strip. On the reference site it is
 * a "DateLine": it sits fully set behind the intro, and once the intro
 * finishes (`rt-intro-done`) it types itself out character by character
 * over 600ms. When no intro is present (e.g. reduced motion or JS
 * disabled pages), it types immediately on mount.
 *
 * The full text is rendered in a transparent span to keep the layout
 * width stable, with the visible portion on an absolutely positioned
 * overlay.
 */
export default function DateLine({ text }: { text: string }) {
  const [shown, setShown] = useState(text.length);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let t0 = 0;
      const tick = (now: number) => {
        t0 || (t0 = now);
        const l = Math.min(1, (now - t0) / 600);
        setShown(Math.round(l * text.length));
        if (l < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (document.querySelector(".fm-intro")) {
      window.addEventListener("rt-intro-done", run, { once: true });
      return () => window.removeEventListener("rt-intro-done", run);
    }
    run();
  }, [text.length]);

  return (
    <span className="relative whitespace-nowrap">
      <span className="text-transparent">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">
        {text.slice(0, shown)}
      </span>
    </span>
  );
}
