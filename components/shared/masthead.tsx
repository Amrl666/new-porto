export default function Masthead() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-paper pt-[18px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="flex items-center justify-between gap-4 pb-[9px] font-gothic text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          <div className="flex-1">Jakarta, Indonesia</div>
          <div className="flex-1 text-center">The Investigation Edition</div>
          <div className="flex-1 text-right">Est. 2024</div>
        </div>

        <h1 className="m-0 border-t-2 border-ink px-0 pb-1 pt-1.5 text-center font-display text-[clamp(40px,8.5vw,104px)] font-normal leading-[0.92] tracking-[-0.01em]">
          Amirul Mabruri
          <small className="mt-3.5 block font-gothic text-[clamp(8px,1.7vw,14px)] font-semibold uppercase tracking-[0.2em] text-ink-soft [text-wrap:balance] sm:tracking-[0.42em]">
            The Personal Record of an IT Enthusiast
          </small>
        </h1>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-[22px] gap-y-1 border-y-2 border-ink py-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          <span>
            <span className="relative whitespace-nowrap">
              <span className="text-transparent">{today}</span>
              <span className="absolute inset-0" aria-hidden="true">
                {today}
              </span>
            </span>
          </span>
          <span className="h-[3px] w-[3px] rounded-full bg-ink-soft" />
          <span>Vol. I</span>
          <span className="h-[3px] w-[3px] rounded-full bg-ink-soft" />
          <span>Selected Works &amp; Notes</span>
          <span className="h-[3px] w-[3px] rounded-full bg-ink-soft" />
          <span>Price: One Coffee</span>
        </div>
      </div>
    </header>
  );
}
