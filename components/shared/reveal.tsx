"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

let observer: IntersectionObserver | null = null;

/**
 * Shared observer — mirrors the reference site: any `.rv` element that
 * intersects gets `.is-revealed` and is then unobserved.
 */
function observe(el: HTMLElement) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  observer.observe(el);
}

/**
 * Enables the rv-* reveal system from the reference site.
 *
 * On mount it adds `.js-motion` to <html> (only then do the reveal
 * transitions kick in — content is visible by default without JS),
 * then an IntersectionObserver adds `.is-revealed` to every `.rv`
 * element as it enters the viewport.
 *
 * If the intro overlay (`.fm-intro`) is on screen, reveals are held
 * back until it dispatches `rt-intro-done` — so the page's entrance
 * animations play *after* the newspaper lifts away, exactly like
 * roberttran.com.au — and only then are elements observed.
 *
 * Re-runs on every route change so elements on freshly navigated
 * pages (project/blog detail pages, etc.) are observed too.
 *
 * Should be mounted once, high in the tree (e.g. in the root layout).
 */
export default function RevealSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-motion");

    // Observe every `.rv` element — section headers use plain `.rv`
    // containers whose `rv-word` / `rv-fade` children stay hidden until
    // the container itself gets `.is-revealed` (the CSS keys off
    // `.rv:not(.is-revealed)`). `.rv-settle` / `.rv-rule` / `.rv-develop`
    // are `.rv` too, so this single selector covers everything.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".rv")
    );

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    // Wait for the intro to finish before starting the entrance
    // animations. If the intro isn't on screen, reveal immediately.
    if (document.querySelector(".fm-intro") === null) {
      targets.forEach(observe);
      return;
    }

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      targets.forEach(observe);
      window.removeEventListener("rt-intro-done", release);
    };
    window.addEventListener("rt-intro-done", release);

    return () => window.removeEventListener("rt-intro-done", release);
  }, [pathname]);

  return null;
}
