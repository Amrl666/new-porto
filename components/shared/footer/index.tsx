"use client";

export default function Footer() {
  const replayIntro = () => {
    window.dispatchEvent(new CustomEvent("replay-intro"));
  };

  return (
    <footer className="border-t-[6px] border-ink bg-ink px-0 pb-[30px] pt-14 text-paper">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="border-b border-paper/30 pb-[22px] text-center font-display text-[clamp(42px,7vw,82px)] leading-[0.9] tracking-[-0.01em]">
          Amirul Mabruri
        </div>

        <div className="grid grid-cols-1 gap-8 pt-[30px] min-[600px]:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="min-[600px]:col-span-1">
            <p className="max-w-[34ch] font-text text-[15px] leading-[1.6] text-paper/[0.78]">
              An IT enthusiast in Jakarta, Indonesia — exploring everything from
              software engineering to data science, machine learning, and
              beyond. This broadsheet is hand-set in Caslon and Franklin.
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
              Sections
            </h4>
            <a className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper" href="#work">
              Selected Works
            </a>
            <a className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper" href="#stack">
              The Stack
            </a>
            <a className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper" href="#contact">
              Contact
            </a>
          </div>

          <div>
            <h4 className="mb-3.5 font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
              The Desk
            </h4>
            <p className="mb-2.5 font-text text-[15px] text-paper">
              Jakarta, Indonesia
            </p>
            <p className="mb-2.5 font-text text-[15px] text-paper">
              WIB · Remote-first
            </p>
            <a
              className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
              href="mailto:amirul.mabruri03@gmail.com"
            >
              amirul.mabruri03@gmail.com
            </a>
          </div>

          <div>
            <h4 className="mb-3.5 font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
              Wire Services
            </h4>
            <a
              className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
              href="https://github.com/Amrl666"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
              href="https://www.linkedin.com/in/amirul-mabruri-/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <span
            aria-hidden="true"
            className="inline-block -rotate-6 border-4 border-stamp-bright px-6 py-2 font-gothic text-[15px] font-black uppercase tracking-[0.3em] text-stamp-bright [filter:url(#fm-rough)]"
          >
            Case Closed
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-paper/30 pt-5 font-gothic text-[11px] font-medium uppercase tracking-[0.1em] text-paper/70 min-[600px]:flex-row min-[600px]:justify-between">
          <span>
            © 2026 The Amirul Times · All rights reserved · Printed in Jakarta
          </span>
          <div className="flex gap-2.5">
            <a
              className="flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:bg-paper hover:text-ink"
              href="https://github.com/Amrl666"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              className="flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:bg-paper hover:text-ink"
              href="https://www.linkedin.com/in/amirul-mabruri-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <button
              type="button"
              title="Reopen the case"
              aria-label="Reopen the case — replay the intro"
              onClick={replayIntro}
              className="flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:border-stamp-bright hover:text-stamp-bright"
            >
              <ReplayIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
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
      className="h-[18px] w-[18px]"
    >
      <path d="M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-[18px] w-[18px]"
    >
      <path d="M216,20H40A20,20,0,0,0,20,40V216a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V40A20,20,0,0,0,216,20Zm-4,192H44V44H212ZM112,176V120a12,12,0,0,1,21.43-7.41A40,40,0,0,1,192,148v28a12,12,0,0,1-24,0V148a16,16,0,0,0-32,0v28a12,12,0,0,1-24,0ZM96,120v56a12,12,0,0,1-24,0V120a12,12,0,0,1,24,0ZM68,80A16,16,0,1,1,84,96,16,16,0,0,1,68,80Z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-[22px] w-[22px]"
    >
      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
      <path d="M72,128a134.63,134.63,0,0,1-14.16,60.47,8,8,0,1,1-14.32-7.12A118.8,118.8,0,0,0,56,128,71.73,71.73,0,0,1,83,71.8,8,8,0,1,1,93,84.29,55.76,55.76,0,0,0,72,128Zm56-8a8,8,0,0,0-8,8,184.12,184.12,0,0,1-23,89.1,8,8,0,0,0,14,7.76A200.19,200.19,0,0,0,136,128,8,8,0,0,0,128,120Zm0-32a40,40,0,0,0-40,40,8,8,0,0,0,16,0,24,24,0,0,1,48,0,214.09,214.09,0,0,1-20.51,92A8,8,0,1,0,146,226.83,230,230,0,0,0,168,128,40,40,0,0,0,128,88Zm0-64A104.11,104.11,0,0,0,24,128a87.76,87.76,0,0,1-5,29.33,8,8,0,0,0,15.09,5.33A103.9,103.9,0,0,0,40,128a88,88,0,0,1,176,0,282.24,282.24,0,0,1-5.29,54.45,8,8,0,0,0,6.3,9.4,8.22,8.22,0,0,0,1.55.15,8,8,0,0,0,7.84-6.45A298.37,298.37,0,0,0,232,128,104.12,104.12,0,0,0,128,24ZM94.4,152.17A8,8,0,0,0,85,158.42a151,151,0,0,1-17.21,45.44,8,8,0,0,0,13.86,8,166.67,166.67,0,0,0,19-50.25A8,8,0,0,0,94.4,152.17ZM128,56a72.85,72.85,0,0,0-9,.56,8,8,0,0,0,2,15.87A56.08,56.08,0,0,1,184,128a252.12,252.12,0,0,1-1.92,31A8,8,0,0,0,189,168a8.39,8.39,0,0,0,1,.06,8,8,0,0,0,7.92-7,266.48,266.48,0,0,0,2-33A72.08,72.08,0,0,0,128,56Zm57.93,128.25a8,8,0,0,0-9.75,5.75c-1.46,5.69-3.15,11.4-5,17a8,8,0,0,0,5,10.13,7.88,7.88,0,0,0,2.55.42,8,8,0,0,0,7.58-5.46c2-5.92,3.79-12,5.35-18.05A8,8,0,0,0,185.94,184.26Z" />
    </svg>
  );
}
