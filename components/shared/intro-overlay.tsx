"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

/**
 * The opening "magnifying glass" intro, matching the reference.
 *
 * The lens follows the cursor over a blurred newspaper. Moving the lens
 * to the centre (where the WANTED masthead sits) — or waiting a moment —
 * triggers the find: the lens zooms in, the WANTED stamp slams down and
 * the intro fades into the site.
 *
 * Replays when a "replay-intro" CustomEvent is dispatched on window.
 */
export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"base" | "seek" | "found" | "gone">("base");

  // Lens position, relative to the screen centre (in px)
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const lensScale = useMotionValue(0.4);

  // Content inside the lens pans opposite to the lens, like a real glass
  const innerX = useTransform(lensX, (v) => -v * 0.62);
  const innerY = useTransform(lensY, (v) => -v * 0.62);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const foundRef = useRef(false);
  const movedRef = useRef(false);
  const phaseRef = useRef<"base" | "seek" | "found" | "gone">("base");
  phaseRef.current = phase;

  const run = () => {
    timers.current.forEach(clearTimeout);
    foundRef.current = false;
    movedRef.current = false;
    setVisible(true);
    setPhase("base");
    lensX.set(0);
    lensY.set(0);
    lensScale.set(0.4);
    target.current = { x: 0, y: 0 };

    const t = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    // Base scene settles, then the lens appears and starts tracking the cursor
    t(() => {
      setPhase("seek");
      lensScale.set(1);
    }, 450);

    // Escape hatch: if the subject is never found, enter after a long while
    t(() => find("auto"), 15000);
  };

  const find = (reason: "auto" | "cursor") => {
    if (foundRef.current || phaseRef.current === "gone") return;
    foundRef.current = true;
    timers.current.forEach(clearTimeout);
    setPhase("found");

    // Pull the lens to the centre and blow it up
    animate(lensX, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    animate(lensY, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    animate(lensScale, 11, {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setPhase("gone");
        timers.current.push(setTimeout(() => setVisible(false), 500));
      },
    });
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      };
      movedRef.current = true;
    };

    // Lerp the lens toward the cursor each frame
    const loop = () => {
      if (phaseRef.current === "seek") {
        const cx = lensX.get();
        const cy = lensY.get();
        lensX.set(cx + (target.current.x - cx) * 0.3);
        lensY.set(cy + (target.current.y - cy) * 0.3);

        // Found the name: the cursor hovers over the centre masthead.
        // Only counts once the pointer has actually moved, so the intro
        // doesn't self-trigger while the cursor sits at its default spot.
        if (movedRef.current && !foundRef.current) {
          const dist = Math.hypot(target.current.x, target.current.y);
          if (dist < 60) {
            find("cursor");
          }
        }
      }
      raf.current = requestAnimationFrame(loop);
    };

    const onReplay = () => run();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("replay-intro", onReplay);
    run();
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("replay-intro", onReplay);
      cancelAnimationFrame(raf.current);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    foundRef.current = true;
    setPhase("gone");
    timers.current.push(setTimeout(() => setVisible(false), 500));
  };

  const sceneActive = phase === "base" || phase === "seek" || phase === "found";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fm-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "gone" ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          onClick={skip}
        >
          {/* The newspaper columns behind everything */}
          <div className="fm-zoom">
            <motion.div
              className="fm-scene fm-scene--base"
              animate={{
                opacity: phase === "found" ? 0 : 0.5,
                scale: phase === "found" ? 1.35 : 1,
              }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <NewspaperColumns />
            </motion.div>

            <div className="fm-masthead">
              <div className="fm-masthead-k">Wanted</div>
              <div className="fm-masthead-t">Amirul Mabruri</div>
              <div className="fm-masthead-r" />
            </div>
          </div>

          {/* Dark dim that shrinks away as the lens opens */}
          <motion.div
            className="fm-dim"
            animate={{
              opacity: phase === "found" ? 0 : 0.6,
              scale: phase === "found" ? 0.02 : 1,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="fm-grain" />

          {/* The lens — follows the cursor, pans the paper beneath it */}
          <motion.div
            className="fm-lens"
            style={{ x: lensX, y: lensY, scale: lensScale }}
          >
            <div className="fm-lens-mag">
              <motion.div
                className="fm-lens-mag-inner"
                style={{ x: innerX, y: innerY }}
              >
                <NewspaperColumns />
              </motion.div>
            </div>
            <div className="fm-lens-glass" />
            <div className="fm-lens-rim" />
            <div className="fm-lens-handle" />
          </motion.div>

          {/* WANTED stamp */}
          <div className="fm-stampwrap">
            <motion.div
              className="fm-stamp"
              initial={{ scale: 1.6, rotate: -8, opacity: 0 }}
              animate={
                phase === "found"
                  ? { scale: 1, rotate: -4, opacity: 1 }
                  : { scale: 1.6, rotate: -8, opacity: 0 }
              }
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
            >
              Wanted
            </motion.div>
          </div>

          {sceneActive && (
            <motion.div
              className="fm-hint"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              Take the glass — find the subject
            </motion.div>
          )}

          <button className="fm-skip" type="button" onClick={skip}>
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NewspaperColumns() {
  const columns = [
    {
      title: "The Morning Brief",
      lines: ["", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "x", "", "", "", "s", "", "", "", "s", "", "s", "", "x", "", "", "s", "", "", ""],
    },
    {
      title: "Notes from the Desk",
      lines: ["", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "x", "", "", "", "s", "", "", "", "s", "", "s", "", "x", "", "", "s", "", "", ""],
    },
    {
      title: "Field Report",
      lines: ["", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "s", "", "x", ""],
    },
    {
      title: "Late Edition",
      lines: ["", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "s"],
    },
    {
      title: "On the Record",
      lines: ["", "", "s", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", ""],
    },
  ];

  return (
    <>
      {columns.map((col) => (
        <div className="fm-col" key={col.title}>
          <div className="fm-col-h">{col.title}</div>
          <div className="fm-col-r" />
          {col.lines.map((type, i) => (
            <div key={i} className={`fm-col-l ${type}`} />
          ))}
        </div>
      ))}
    </>
  );
}
