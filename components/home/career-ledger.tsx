import { Experience } from "@/sanity/lib/types/experience";

interface Props {
  experience: Experience[];
}

function formatRange(start: string, end?: string | null) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${fmt(start)} — ${end ? fmt(end) : "Now"}`;
}

export default function CareerLedger({ experience }: Props) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="career" className="scroll-mt-20 py-[76px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="mb-[30px]">
          <div className="rv flex flex-wrap items-baseline justify-between gap-5 pb-2.5">
            <div>
              <span className="rv-fade font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
                Known Whereabouts
              </span>
              <h2 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
                <span className="rv-word" style={{ ["--i" as string]: 0 }}>
                  The
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 1 }}>
                  Career
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 2 }}>
                  Ledger
                </span>
              </h2>
            </div>
            <span className="rv-fade whitespace-nowrap font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Movements on record since 2024
            </span>
          </div>
          <div className="rv rv-rule h-1 bg-ink" />
        </div>

        <div className="border-t-2 border-ink">
          {experience.map((item, i) => (
            <div
              key={item._id}
              className="rv rv-settle grid grid-cols-1 items-baseline gap-1.5 border-b border-ink/25 px-1 py-[22px] min-[600px]:grid-cols-[170px_1fr_0.9fr] min-[600px]:gap-6"
              style={{ ["--rv-delay" as string]: `${i * 120}ms` }}
            >
              <div className="flex flex-col items-start gap-1.5 font-mono text-[13px] text-ink-soft">
                <span className="rv-stampchild">
                  {formatRange(item.startDate, item.endDate)}
                </span>
                {item.workType && (
                  <span className="rv-stampchild w-fit border border-ink/40 px-1.5 py-0.5 font-gothic text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                    {item.workType}
                  </span>
                )}
              </div>
              <div className="font-display text-[24px] leading-[1.1]">
                {item.position}
                <b className="mt-1.5 block font-gothic text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </b>
              </div>
              <div className="font-text text-[15px] leading-[1.55] text-ink-soft">
                {item.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
