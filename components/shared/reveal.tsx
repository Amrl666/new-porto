"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Enables the rv-* reveal system from the reference site.
 *
 * On mount it adds `.js-motion` to <html> (only then do the reveal
 * transitions kick in — content is visible by default without JS),
 * then an IntersectionObserver adds `.is-revealed` to every `.rv`
 * element as it enters the viewport.
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

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".rv-settle, .rv-rule, .rv-develop")
    );

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
