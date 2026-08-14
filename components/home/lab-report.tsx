import { Technology } from "@/sanity/lib/types/technology";

interface Props {
  technologies: Technology[];
}

interface TechMeta {
  code: string;
  detected: string;
  finding: string;
  findingStyle?: "stamp" | "ink";
  rotate?: string;
}

// Code / usage / finding mapping. Falls back to a sensible generic
// for technologies that aren't in the table.
const KNOWN: Record<string, TechMeta> = {
  "Next.js": { code: "NEXT", detected: "Most days", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "React": { code: "RACT", detected: "Most days", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "Tailwind CSS": { code: "TWX", detected: "Most days", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "Laravel": { code: "LRVL", detected: "Most days", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "CodeIgniter 3/4": { code: "CI34", detected: "When needed", finding: "Comfortable", findingStyle: "ink", rotate: "-rotate-[1deg]" },
  "Node.js": { code: "NODE", detected: "In projects", finding: "Comfortable", findingStyle: "ink", rotate: "rotate-[1deg]" },
  "MySQL": { code: "MYQL", detected: "Most days", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "Supabase": { code: "SUPA", detected: "In projects", finding: "Comfortable", findingStyle: "ink", rotate: "rotate-[1deg]" },
  "Redis": { code: "REDS", detected: "When needed", finding: "In training", findingStyle: "ink", rotate: "rotate-[1deg]" },
  "Docker": { code: "DCKR", detected: "Learning", finding: "Trace amount", findingStyle: "ink", rotate: "rotate-[1deg]" },
  "Git & GitHub": { code: "GIT", detected: "Most days", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "Bootstrap": { code: "BSTP", detected: "When needed", finding: "Comfortable", findingStyle: "ink", rotate: "-rotate-[1deg]" },
  "Python": { code: "PYTH", detected: "In projects", finding: "Primary tool", findingStyle: "stamp", rotate: "-rotate-[1.5deg]" },
  "TensorFlow": { code: "TFLO", detected: "Learning", finding: "In training", findingStyle: "ink", rotate: "rotate-[1deg]" },
  "scikit-learn": { code: "SKLR", detected: "In projects", finding: "Comfortable", findingStyle: "ink", rotate: "-rotate-[1deg]" },
  "Google Cloud": { code: "GCP", detected: "In projects", finding: "Comfortable", findingStyle: "ink", rotate: "rotate-[1deg]" },
  "Pandas": { code: "PNDS", detected: "In projects", finding: "Comfortable", findingStyle: "ink", rotate: "-rotate-[1deg]" },
};

const GENERIC_FINDINGS = [
  { finding: "Primary tool", findingStyle: "stamp" as const, rotate: "-rotate-[1.5deg]" },
  { finding: "Comfortable", findingStyle: "ink" as const, rotate: "rotate-[1deg]" },
  { finding: "In training", findingStyle: "ink" as const, rotate: "rotate-[1deg]" },
  { finding: "Trace amount", findingStyle: "ink" as const, rotate: "-rotate-[1deg]" },
];

function fallbackMeta(title: string, index: number): TechMeta {
  const slug = title.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4) || "TECH";
  const gen = GENERIC_FINDINGS[index % GENERIC_FINDINGS.length];
  return {
    code: slug,
    detected: index < 4 ? "Most days" : index < 8 ? "In projects" : "Learning",
    ...gen,
  };
}

export default function LabReport({ technologies }: Props) {
  if (!technologies || technologies.length === 0) return null;

  const rows = technologies.map((tech, i) => {
    const meta = KNOWN[tech.title.trim()] ?? fallbackMeta(tech.title, i);
    return { tech, meta, i };
  });

  return (
    <section id="stack" className="scroll-mt-20 py-14 sm:py-[76px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="mb-[30px]">
          <div className="rv flex flex-wrap items-baseline justify-between gap-5 pb-2.5">
            <div>
              <span className="rv-fade font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
                Forensics
              </span>
              <h2 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
                <span className="rv-word" style={{ ["--i" as string]: 0 }}>
                  The
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 1 }}>
                  Lab
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 2 }}>
                  Report
                </span>
              </h2>
            </div>
            <span className="rv-fade whitespace-nowrap font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Substances detected on the subject, as of this edition
            </span>
          </div>
          <div className="rv rv-rule h-1 bg-ink" />
        </div>

        <div className="border-2 border-ink">
          {/* Header row */}
          <div className="hidden grid-cols-[2.4fr_1fr_1fr_1.3fr] bg-ink font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-paper sm:grid">
            <span className="border-r border-paper/25 px-4 py-[9px]">Substance</span>
            <span className="border-r border-paper/25 px-4 py-[9px]">Code</span>
            <span className="border-r border-paper/25 px-4 py-[9px]">Detected</span>
            <span className="px-4 py-[9px] text-right">Finding</span>
          </div>

          {rows.map(({ tech, meta, i }) => (
            <div
              key={tech._id}
              className="rv rv-settle grid gap-2 border-t border-ink/25 px-3.5 py-3.5 font-mono transition-colors first:border-t-0 hover:bg-paper-warm sm:grid-cols-[2.4fr_1fr_1fr_1.3fr] sm:items-center sm:gap-0 sm:px-0 sm:py-0"
              style={{ ["--rv-delay" as string]: `${i * 40}ms` }}
            >
              <span className="flex min-w-0 items-baseline justify-between gap-3 sm:block sm:border-r sm:border-ink/25 sm:px-4 sm:py-[11px]">
                <span className="truncate font-display !text-[19px] tracking-normal sm:tracking-[-0.01em]">
                  {tech.title.trim()}
                </span>
                <span className="shrink-0 font-gothic text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft sm:hidden">
                  {meta.code}
                </span>
              </span>
              <span className="hidden border-r border-ink/25 px-4 py-[11px] text-[13px] text-ink-soft sm:block">
                {meta.code}
              </span>
              <span className="text-[12px] uppercase tracking-[0.08em] text-ink-soft sm:border-r sm:border-ink/25 sm:px-4 sm:py-[11px] sm:text-[13px] sm:normal-case sm:tracking-normal sm:text-ink">
                {meta.detected}
              </span>
              <span className="sm:px-4 sm:py-[9px] sm:text-right">
                <span
                  className={`rv-stampchild border-2 px-2 py-0.5 font-gothic text-[10px] font-black uppercase tracking-[0.14em] ${meta.rotate} ${
                    meta.findingStyle === "stamp"
                      ? "border-stamp text-stamp"
                      : "border-ink/60 text-ink"
                  }`}
                >
                  {meta.finding}
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-left font-gothic text-[11px] font-medium tracking-[0.04em] text-ink-soft sm:text-right">
          Findings are illustrative — what he reaches for day to day, not a ranking.
        </p>
      </div>
    </section>
  );
}
