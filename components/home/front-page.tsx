import Image from "next/image";
import { UserInfo } from "@/sanity/lib/types/userInfo";

interface Props {
  userInfo: UserInfo | null;
}

export default function FrontPage({ userInfo }: Props) {
  const name = userInfo?.name || "Amirul";
  const surname = userInfo?.surname || "Mabruri";
  const summary =
    userInfo?.summary ||
    "I build secure, scalable systems — and explore everything from software engineering to data science, machine learning and beyond.";

  // First two sentences of the summary for the dropcap column
  const sentences = summary
    .split(/(?<=\.)\s+/)
    .filter(Boolean);

  const lead = sentences.slice(0, 2).join(" ") || summary;
  const rest = sentences.slice(2).join(" ") || "";

  return (
    <section className="pb-2 pt-[30px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
          <span>Front Page</span>
          <span>Filed under: Open Investigations</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 min-[940px]:grid-cols-[1.55fr_1fr]">
          {/* Left column — the story */}
          <div>
            <span className="rv rv-settle block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
              Case No. 01 — Findings Published
            </span>
            <div className="rv rv-settle" style={{ ["--rv-delay" as string]: "60ms" }}>
              <h1 className="mt-1 font-display text-[clamp(40px,6.6vw,86px)] font-normal leading-none tracking-[-0.02em]">
                An IT enthusiast who likes building things —{" "}
                <em className="italic">front to back.</em>
              </h1>
            </div>
            <p
              className="rv rv-settle mt-5 max-w-[30ch] border-l-4 border-ink pl-[18px] font-text text-[clamp(18px,2vw,23px)] italic leading-[1.45] text-ink-soft"
              style={{ ["--rv-delay" as string]: "140ms" }}
            >
              From full-stack builds to data, ML and everything in between — a
              record of turning ideas into secure, scalable systems for studios,
              organisations and clients.
            </p>
            <p
              className="rv rv-settle mt-5 font-gothic text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft"
              style={{ ["--rv-delay" as string]: "200ms" }}
            >
              By <b className="text-ink">The Investigation Desk</b> ·{" "}
              Reporting from Jakarta, between EXC Studio and the capital
            </p>
            <div
              className="rv rv-settle mt-[22px] flex flex-wrap gap-3"
              style={{ ["--rv-delay" as string]: "260ms" }}
            >
              <a
                className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-7 py-[15px] font-gothic text-[14px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink"
                href="#work"
              >
                Read the work →
              </a>
              <a
                className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-2 border-ink bg-transparent px-7 py-[15px] font-gothic text-[14px] font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
                href="#contact"
              >
                Get in touch
              </a>
            </div>

            {/* Stats strip */}
            <div
              className="rv rv-settle mt-[30px] grid grid-cols-2 border-y-2 border-ink min-[600px]:grid-cols-4"
              style={{ ["--rv-delay" as string]: "320ms" }}
            >
              <div className="border-b border-ink/25 px-[18px] py-4 min-[600px]:border-b-0 min-[600px]:border-r min-[600px]:border-ink/25">
                <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                  No. 01
                </div>
                <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Edition · first printing
                </div>
              </div>
              <div className="border-b border-ink/25 px-[18px] py-4 min-[600px]:border-b-0 min-[600px]:border-r min-[600px]:border-ink/25">
                <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                  31°C
                </div>
                <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Jakarta · warm &amp; humid
                </div>
              </div>
              <div className="border-r border-ink/25 px-[18px] py-4 min-[600px]:border-r min-[600px]:border-ink/25">
                <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                  Global
                </div>
                <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Circulation · remote-friendly
                </div>
              </div>
              <div className="px-[18px] py-4">
                <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                  Late Final
                </div>
                <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Ships when it&#39;s ready
                </div>
              </div>
            </div>
          </div>

          {/* Right column — the portrait */}
          <div className="border-t-2 border-ink pt-[22px] min-[940px]:border-l min-[940px]:border-t-0 min-[940px]:border-ink/25 min-[940px]:pl-[34px] min-[940px]:pt-0">
            <div className="rv rv-develop relative aspect-square w-full overflow-hidden border-2 border-ink bg-paper" style={{ ["--rv-delay" as string]: "180ms" }}>
              <Image
                alt={`${name} ${surname} — the subject, photographed in his natural habitat`}
                src="/poto.webp"
                fill
                priority
                sizes="(max-width: 940px) 100vw, 380px"
                className="object-cover mix-blend-multiply"
              />
            </div>
            <p className="rv rv-settle mt-2 font-gothic text-[11px] font-medium leading-[1.4] tracking-[0.04em] text-ink-soft" style={{ ["--rv-delay" as string]: "240ms" }}>
              <b className="font-bold uppercase tracking-[0.1em] text-ink">Pictured:</b>{" "}
              the subject, in his natural habitat.
            </p>
            <div
              className="rv rv-settle dropcap mt-[18px] font-text text-[16px] leading-[1.6] [hyphens:auto] [text-align:justify]"
              style={{ ["--rv-delay" as string]: "300ms" }}
            >
              <p className="mb-3">{lead}</p>
              {rest && <p className="mb-3">{rest}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
