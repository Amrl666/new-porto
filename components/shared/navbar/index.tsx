"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const NAV_LINKS = [
  { name: "Work", href: "#work" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  /**
   * Scrolls to an in-page anchor reliably (native browsers sometimes
   * skip the jump when the hash is already in the URL, and next/link
   * doesn't always trigger a scroll on the same page).
   */
  const scrollTo = (href: string) => {
    if (!isHome) return; // cross-page links navigate normally
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      // "auto" picks up CSS scroll-behavior: smooth on desktop, but stays
      // instant on touch devices (smooth programmatic scroll + sticky
      // header jitters on mobile browsers).
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const renderLink = (link: { name: string; href: string }) =>
    isHome ? (
      <a
        key={link.name}
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(link.href);
        }}
        className="cursor-pointer border-b-2 border-transparent pb-0.5 font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-150 hover:border-ink"
      >
        {link.name}
      </a>
    ) : (
      <Link
        key={link.name}
        href={`/${link.href}`}
        className="cursor-pointer border-b-2 border-transparent pb-0.5 font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-150 hover:border-ink"
      >
        {link.name}
      </Link>
    );

  const hireHref = isHome ? "#contact" : "/#contact";

  return (
    <div
      className="nav-wrap sticky top-0 z-40 border-b-2 border-ink bg-paper"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <nav className="flex min-h-[50px] items-center justify-between gap-[18px] py-[9px]">
          <Link
            href="/"
            onClick={(e) => {
              // Next.js skips the scroll when already on "/" (esp. with a
              // hash in the URL) — force it.
              if (!isHome) return;
              e.preventDefault();
              if (window.scrollY > 0) {
                window.scrollTo({ top: 0, behavior: "auto" });
              }
              window.history.replaceState(null, "", "/");
            }}
            className="cursor-pointer whitespace-nowrap select-none font-display text-[22px] font-normal tracking-[-0.01em] text-ink"
          >
            Amirul Mabruri
          </Link>

          <div className="hidden items-center gap-[26px] min-[940px]:flex">
            {NAV_LINKS.map(renderLink)}
            <ThemeToggle />
            {isHome ? (
              <a
                href={hireHref}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(hireHref);
                }}
                className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-[15px] font-gothic text-[11.5px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
              >
                Hire him
              </a>
            ) : (
              <Link
                href={hireHref}
                className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-[15px] font-gothic text-[11.5px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
              >
                Hire him
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 min-[940px]:hidden">
            <ThemeToggle />
            <span className="hidden min-[460px]:inline-flex">
              {isHome ? (
                <a
                  href={hireHref}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(hireHref);
                  }}
                  className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-[15px] font-gothic text-[11.5px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
                >
                  Hire him
                </a>
              ) : (
                <Link
                  href={hireHref}
                  className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-[15px] font-gothic text-[11.5px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
                >
                  Hire him
                </Link>
              )}
            </span>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-[42px] w-[42px] flex-none flex-col items-center justify-center gap-[5px] border-2 border-ink"
            >
              <span
                className={cn(
                  "h-0.5 w-5 bg-ink transition-transform duration-200",
                  mobileOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-ink transition-opacity duration-150",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-ink transition-transform duration-200",
                  mobileOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>

        <div
          aria-hidden={!mobileOpen}
          className={cn(
            "overflow-hidden transition-all duration-200 min-[940px]:hidden",
            mobileOpen ? "pointer-events-auto max-h-[600px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          )}
        >
          <div className="border-t-2 border-ink pb-4 pt-1.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => {
                  setMobileOpen(false);
                  if (isHome) {
                    const id = link.href.replace("#", "");
                    // Delay so the panel collapses first
                    setTimeout(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
                    }, 80);
                  }
                }}
                className="flex items-center justify-between border-b border-ink/25 px-0.5 py-[15px] font-display text-[30px] font-normal tracking-[-0.01em] text-ink"
              >
                <span>{link.name}</span>
                <ArrowUpRightIcon />
              </a>
            ))}
            <div className="mt-[18px]">
              {isHome ? (
                <a
                  href={hireHref}
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "auto", block: "start" });
                    }, 80);
                  }}
                  className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-[22px] py-3 font-gothic text-[13px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
                >
                  Hire him →
                </a>
              ) : (
                <Link
                  href={hireHref}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-[22px] py-3 font-gothic text-[13px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
                >
                  Hire him →
                </Link>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-[18px] gap-y-2 font-gothic text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
              <span className="inline-flex items-center gap-[7px]">
                <MapPinIcon />
                Jakarta, ID
              </span>
              <span className="inline-flex items-center gap-[7px]">
                <GithubIcon />
                <a
                  href="https://github.com/Amrl666"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/Amrl666
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-[18px] w-[18px] text-ink-soft"
    >
      <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-3.5 w-3.5"
    >
      <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-3.5 w-3.5"
    >
      <path d="M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z" />
    </svg>
  );
}
