"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Newspaper text-line patterns per column, taken verbatim from the
 * reference intro. Each column is the same 13-line unit
 * (x · · s · · · · s · · s ·) rotated by a different offset, so the
 * heavier "x" lines never line up horizontally.
 */
const COLUMNS = [
  {
    title: "The Morning Brief",
    lines: ["x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", ""],
  },
  {
    title: "Notes from the Desk",
    lines: ["", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", ""],
  },
  {
    title: "Field Report",
    lines: ["", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", ""],
  },
  {
    title: "Late Edition",
    lines: ["", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s"],
  },
  {
    title: "On the Record",
    lines: ["", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s", "", "", "s", "", "x", "", "", "s", "", "", "", "", "s"],
  },
];

function NewspaperColumns() {
  return (
    <>
      {COLUMNS.map((col) => (
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

function Masthead() {
  return (
    <div className="fm-masthead">
      <div className="fm-masthead-k">Wanted</div>
      <div className="fm-masthead-t">Amirul Mabruri</div>
      <div className="fm-masthead-r" />
    </div>
  );
}

/**
 * Piecewise-linear interpolation — identical to the reference's `l()`.
 */
function lerp(x: number, keys: number[], vals: number[]): number {
  if (x <= keys[0]) return vals[0];
  for (let n = 1; n < keys.length; n++) {
    if (x <= keys[n]) {
      const r = (x - keys[n - 1]) / (keys[n] - keys[n - 1]);
      return vals[n - 1] + (vals[n] - vals[n - 1]) * r;
    }
  }
  return vals[vals.length - 1];
}

/**
 * Lens radius for a viewport — identical to the reference's `i()`:
 * clamp(0.12 * min(w, h), 82, 104). The lens is 2N wide, the clip
 * circle is N, and the halo gradient is built around N.
 */
function lensRadius(w: number, h: number): number {
  return Math.round(Math.min(104, Math.max(82, 0.12 * Math.min(w, h))));
}

/**
 * The opening "magnifying glass" intro — a faithful port of the
 * roberttran.com.au intro (same logic, timings and easing).
 *
 * Hunt phase: a tilted (-10°) lens trails the pointer at 12%/frame
 * (light, responsive — not a heavy 3% drag). If the pointer stays
 * still for more than 3s the target itself drifts toward the centre
 * at 2%/frame, so the lens slowly walks back to the subject — there
 * is no hard timer, exactly like the reference. The find fires when
 * the lens is within 0.6×lensRadius of the centre, sustained for
 * >250ms (so sweeping past doesn't trigger it), and only after 800ms.
 *
 * Locked phase: the lens eases to the centre over 320ms with a damped
 * sine "getar" on its position and rotation, the scene dims, a paper
 * flash wipes in, the "Identified" stamp slams down (scale 2→.8→1.1→1)
 * and the whole thing blurs and fades out, then dispatches
 * `rt-intro-done` (which releases the page's reveal animations and the
 * date-line typewriter).
 *
 * Skips: the Skip button, or the Escape key. Replays when a
 * "replay-intro" CustomEvent is dispatched on window.
 */
export default function IntroOverlay() {
  const [exit, setExit] = useState(false); // m — fm-intro--exit class
  const [hidden, setHidden] = useState(false); // c — unmounted
  const [phase, setPhase] = useState<"hunt" | "locked">("hunt");
  const [x, setX] = useState(0.48); // progress 0.48 → 1, drives everything
  const [lens, setLens] = useState({ x: 0, y: 0, r: -10 });

  // Viewport size (SSR-safe: defaults match what the server renders).
  const [size, setSize] = useState<{ W: number; H: number }>({ W: 1200, H: 800 });

  // Coarse (touch) pointer — read via useSyncExternalStore with a server
  // snapshot, exactly like the reference, so the server and the first
  // client render agree during hydration (no hydration mismatch on the
  // hint text) and the touch hint appears once the client takes over.
  const coarse = useSyncExternalStore(
    () => () => {}, // never emits (static media query)
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
    () => false
  );

  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 }); // b — pointer target
  const pos = useRef({ x: 0, y: 0 }); // w — lens current position
  const lastMove = useRef(0); // j — last pointermove time
  const closeSince = useRef(0); // y — first frame inside the find radius
  const huntStart = useRef(0);
  const doneRef = useRef(false);

  // Keep SSR/hydration safe and stay responsive to resizes.
  useEffect(() => {
    const upd = () =>
      setSize({ W: window.innerWidth || 1200, H: window.innerHeight || 800 });
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  /** finish (k): exit class, then unmount + scroll to top + release the page. */
  const finish = useCallback(() => {
    // Remember that the intro was seen so a refresh doesn't replay it
    // (session cookie, same as the reference's `rt_intro_seen`).
    document.cookie = "rt_intro_seen=1; path=/; SameSite=Lax";
    setExit(true);
    setTimeout(() => {
      setHidden(true);
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("rt-intro-done"));
    }, 460);
  }, []);

  // Hunt phase — pointer trail + idle drift + sustained find detection.
  useEffect(() => {
    if (hidden || phase !== "hunt") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    const W = window.innerWidth || 1200;
    const H = window.innerHeight || 800;
    const N = lensRadius(W, H);
    pos.current = { x: -0.3 * W, y: -0.2 * H }; // lens starts off-centre
    target.current = { ...pos.current };
    lastMove.current = performance.now();
    huntStart.current = performance.now();
    closeSince.current = 0;

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX - W / 2, y: e.clientY - H / 2 };
      lastMove.current = performance.now();
    };
    window.addEventListener("pointermove", onMove);

    const loop = (now: number) => {
      const tgt = target.current;
      const cur = pos.current;
      // Idle >3s: the target drifts back toward the centre at 2%/frame —
      // this is the reference's "auto-find", there is no hard timer.
      if (now - lastMove.current > 3000) {
        tgt.x += (0 - tgt.x) * 0.02;
        tgt.y += (0 - tgt.y) * 0.02;
      }
      // Lens trails the target at 12%/frame (light, responsive).
      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;
      setLens({ x: cur.x, y: cur.y, r: -10 });

      if (Math.hypot(cur.x, cur.y) < 0.6 * N && now - huntStart.current > 800) {
        if (closeSince.current) {
          if (now - closeSince.current > 250) {
            setPhase("locked");
            return;
          }
        } else {
          closeSince.current = now;
        }
      } else {
        closeSince.current = 0;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, [hidden, phase, finish]);

  // Locked phase — snap to centre (320ms easeOutCubic, rot -10→2), then
  // progress x 0.48→1 over 3400ms driving dim/flash/stamp/exit.
  useEffect(() => {
    if (hidden || phase !== "locked") return;
    const from = { ...pos.current };
    let t0 = 0;
    let fired = false;
    const loop = (now: number) => {
      t0 || (t0 = now);
      const l = 1 - Math.pow(1 - Math.min(1, (now - t0) / 320), 3);
      setLens({ x: from.x * (1 - l), y: from.y * (1 - l), r: -10 + 12 * l });
      const i = Math.min(1, (now - t0 - 320) / 3400);
      if (i > 0) setX(0.48 + 0.52 * i);
      if (i >= 1) {
        if (!fired) {
          fired = true;
          setTimeout(finish, 320);
        }
        return;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [hidden, phase, finish]);

  // Escape skips (reference behaviour).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  // Replay via the footer's "Reopen the case" button.
  useEffect(() => {
    const onReplay = () => {
      setExit(false);
      setHidden(false);
      setPhase("hunt");
      setX(0.48);
      setLens({ x: 0, y: 0, r: -10 });
      closeSince.current = 0;
      target.current = { x: 0, y: 0 };
    };
    window.addEventListener("replay-intro", onReplay);
    return () => window.removeEventListener("replay-intro", onReplay);
  }, []);

  if (hidden) return null;

  // ---- Render, driven by progress x and the lens state (reference math) ----
  const { W, H } = size;
  const N = lensRadius(W, H);
  let M = lens.x;
  let Hy = lens.y;
  let V = lens.r;
  // Damped sine "getar" as the lens locks onto the subject.
  if (x > 0.5 && x < 0.59) {
    const e = (x - 0.5) / 0.09;
    const a = 1 - e;
    M += 8 * Math.sin(e * Math.PI * 11) * a;
    Hy += 5 * Math.cos(e * Math.PI * 9) * a;
    V += 5 * Math.sin(e * Math.PI * 13) * a;
  }
  const F = W / 2 + M; // lens centre on screen
  const L = H / 2 + Hy;
  const C = -0.9 * F; // magnified scene offset
  const S = -0.9 * L;

  const lensOpacity = lerp(x, [0.68, 0.74], [1, 0]);
  const dim = lerp(x, [0.48, 0.56], [0, 0.3]);
  const hintOpacity = phase === "hunt" ? 1 : 0;
  const flash = lerp(x, [0.66, 0.74], [0, 1]);
  const stampOpacity = lerp(x, [0.76, 0.785], [0, 1]);
  const stampScale = lerp(x, [0.76, 0.798, 0.83, 0.86], [2, 0.8, 1.1, 1]);
  const stampY = lerp(x, [0.76, 0.798], [-54, 0]);
  const stampRot = lerp(x, [0.76, 0.86], [-14, -10]);

  const U = Math.min(1, Math.max(0, (x - 0.94) / 0.06)); // exit 0.94→1
  const D = U < 0.5 ? 4 * U * U * U : 1 - Math.pow(-2 * U + 2, 3) / 2; // easeInOutCubic
  const zoomScale = lerp(x, [0.94, 0.98, 1], [1, 1.035, 1.02]);
  const backdropBlur = lerp(x, [0.93, 0.96, 0.99, 1], [0, 10, 3, 0]);
  const backdropFilter = backdropBlur > 0.1 ? `blur(${backdropBlur}px)` : "none";
  const clipPath = `circle(${N}px at ${F}px ${L}px)`;

  return (
    <div className={exit ? "fm-intro fm-intro--exit" : "fm-intro"}>
      {/* Backdrop blur that ramps in during the exit */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
      />
      <div
        className="fm-zoom"
        style={{
          transform: `scale(${zoomScale})`,
          opacity: 1 - D,
          filter: `blur(${5 * D}px)`,
          transformOrigin: "50% 50%",
          transition: "opacity .2s ease, filter .2s ease",
        }}
      >
        {/* Blurred newspaper behind everything */}
        <div className="fm-scene fm-scene--base">
          <NewspaperColumns />
          <Masthead />
        </div>

        {/* Magnified 1.9× copy of the page, clipped to the lens circle */}
        <div className="fm-scene--mag-clip" style={{ clipPath, WebkitClipPath: clipPath }}>
          <div
            className="fm-scene fm-scene--mag"
            style={{
              transform: `translate(${C}px, ${S}px) scale(1.9)`,
              transformOrigin: "0px 0px",
            }}
          >
            <NewspaperColumns />
            <Masthead />
          </div>
        </div>

        {/* Dark halo around the glass (the "light" of the lens) */}
        <div
          className="fm-lens-shadow"
          style={{
            transform: `translate(${M}px, ${Hy}px)`,
            background: `radial-gradient(circle at 50% 50%, transparent ${N - 4}px, rgba(22,20,15,.26) ${N + 200}px, rgba(22,20,15,.42) 58%)`,
          }}
          aria-hidden="true"
        />

        {/* Scene dim during the find */}
        <div className="fm-dim" style={{ opacity: dim }} />

        {/* The lens — rim, glass glare and handle follow the pointer */}
        <div
          className="fm-lens"
          style={{
            width: 2 * N,
            height: 2 * N,
            marginLeft: -N,
            marginTop: -N,
            transform: `translate(${M}px, ${Hy}px) rotate(${V}deg)`,
            opacity: lensOpacity,
            transition: "opacity .2s ease",
          }}
        >
          <div className="fm-lens-handle" />
          <div className="fm-lens-glass" />
          <div className="fm-lens-rim" />
        </div>

        <div className="fm-grain" />

        {/* Paper flash that wipes in before the reveal */}
        <div className="fm-flash" style={{ opacity: flash }} />

        {/* WANTED-style "Identified" stamp */}
        <div className="fm-stampwrap" style={{ zIndex: 9 }}>
          <div
            className="fm-stamp"
            style={{
              opacity: stampOpacity,
              transform: `translateY(${stampY}px) scale(${stampScale}) rotate(${stampRot}deg)`,
              transition: "opacity .1s ease-out",
            }}
          >
            Identified
          </div>
        </div>
      </div>

      <div className="fm-hint" style={{ opacity: hintOpacity, transition: "opacity .3s ease" }}>
        {coarse ? "Drag the glass — find the subject" : "Take the glass — find the subject"}
      </div>

      <button className="fm-skip" type="button" onClick={finish}>
        Skip intro →
      </button>
    </div>
  );
}
