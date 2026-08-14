import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { Project } from "@/sanity/lib/types/project";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

interface Props {
  projects: Project[];
}

const EXHIBIT_LABELS = ["A", "B", "C", "D", "E", "F", "G"];

export default function Evidence({ projects }: Props) {
  if (!projects || projects.length === 0) return null;

  const [featured, ...rest] = projects;
  const exhibits = rest.slice(0, 6);

  const featuredImage = featured.image
    ? builder.image(featured.image).width(900).url()
    : "/file.svg";
  const featuredStack = featured.stack?.slice(0, 5) ?? [];

  const featuredYear = featured.publishedAt
    ? new Date(featured.publishedAt).getFullYear()
    : null;

  return (
    <section id="work" className="scroll-mt-20 py-[76px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="mb-[30px]">
          <div className="rv flex flex-wrap items-baseline justify-between gap-5 pb-2.5">
            <div>
              <span className="rv-fade font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
                The Evidence
              </span>
              <h2 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
                <span className="rv-word" style={{ ["--i" as string]: 0 }}>
                  Selected
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 1 }}>
                  Works
                </span>
              </h2>
            </div>
            <span className="rv-fade whitespace-nowrap font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Exhibits A – {String.fromCharCode(64 + Math.min(projects.length, 7))} · Entered 2024 – Now
            </span>
          </div>
          <div className="rv rv-rule h-1 bg-ink" />
        </div>

        {/* Featured exhibit */}
        <article
          id={`exhibit-${featured.slug.current}`}
          className="group relative flex flex-col items-stretch gap-8 border-b border-ink/25 py-7 transition-colors hover:bg-paper-warm min-[940px]:flex-row"
        >
          <div className="rv rv-develop w-full self-start min-[940px]:w-[46%] min-[940px]:flex-none">
            <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
              />
              <div className="relative aspect-video overflow-hidden border border-ink/40 bg-paper min-[940px]:aspect-auto min-[940px]:h-[272px]">
                <Image
                  alt={featured.title}
                  src={featuredImage}
                  fill
                  sizes="(max-width: 940px) 100vw, 540px"
                  className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(166,56,44,0.5)_0.7px,transparent_0.8px)] bg-[length:4px_4px] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-2.5 rotate-[8deg] scale-150 border-[3px] border-stamp bg-paper-bright/85 px-2.5 py-1 font-gothic text-[11px] font-black uppercase tracking-[0.18em] text-stamp opacity-0 transition-all duration-200 ease-out [filter:url(#fm-rough)] group-hover:-rotate-[8deg] group-hover:scale-100 group-hover:opacity-100"
                >
                  Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-1 py-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-soft">
                <span className="relative shrink-0 font-bold uppercase text-ink">
                  Exhibit A
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 44"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -bottom-1.5 -left-2 -right-3 -top-1.5 h-[calc(100%+12px)] w-[calc(100%+20px)]"
                  >
                    <path
                      d="M10 24 C 8 10, 44 4, 76 7 C 104 10, 116 18, 112 28 C 108 38, 70 42, 40 39 C 16 37, 8 30, 12 20"
                      fill="none"
                      stroke="#a6382c"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.85"
                      pathLength={1}
                      className="rv-sketch"
                    />
                  </svg>
                </span>
                <span className="truncate">
                  {featured.url ? (
                    <>recovered from {featured.url.replace(/^https?:\/\/(www\.)?/, "")}</>
                  ) : (
                    <>recovered from the archive</>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="rv rv-settle flex flex-1 flex-col" style={{ ["--rv-delay" as string]: "80ms" }}>
            <span className="font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-stamp">
              Exhibit A
            </span>
            <span className="mt-3 font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
              {featured.company || "Selected Work"} · Flagship
            </span>
            <h3 className="mt-2 font-display text-[clamp(30px,3.6vw,46px)] font-normal leading-[1.06] tracking-[-0.01em]">
              {featured.title}
            </h3>
            <p className="mt-3.5 mb-auto max-w-[60ch] font-text text-[17px] leading-[1.55] text-ink-soft [hyphens:auto] [text-align:justify]">
              {featured.description}
            </p>
            {featuredStack.length > 0 && (
              <div className="mb-4 mt-[18px] flex flex-wrap gap-1.5">
                {featuredStack.map((tech) => (
                  <span
                    key={tech._id}
                    className="inline-flex items-center gap-1.5 border border-ink bg-transparent px-2.5 py-[3px] font-mono text-[11px] font-medium text-ink"
                  >
                    {tech.title}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between gap-3 border-t border-ink/25 pt-3.5">
              <span className="font-mono text-xs text-ink-soft">
                {featuredYear ? `${featuredYear} — Now` : "2024 — Now"}
              </span>
              <Link
                href={`/projects/${featured.slug.current}`}
                className="group inline-flex items-center gap-1.5 border-b-[1.5px] border-stamp pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] text-stamp"
              >
                Open case file{" "}
                <span className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </article>

        {/* Grid of remaining exhibits */}
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[940px]:grid-cols-3">
          {exhibits.map((project, i) => (
            <ExhibitCard key={project._id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExhibitCard({ project, index }: { project: Project; index: number }) {
  const label = EXHIBIT_LABELS[index + 1] ?? String.fromCharCode(65 + index + 1);
  const imageUrl = project.image
    ? builder.image(project.image).width(600).url()
    : "/file.svg";
  const year = project.publishedAt
    ? new Date(project.publishedAt).getFullYear()
    : null;
  const stack = project.stack?.slice(0, 4) ?? [];

  return (
    <article
      className="rv rv-settle group relative flex flex-col border-t border-ink/25 py-[26px] pr-0 transition-colors hover:bg-paper-warm min-[600px]:border-r min-[600px]:border-ink/25 min-[600px]:pr-[26px] min-[600px]:[&:nth-child(2n)]:border-r-0 min-[600px]:[&:nth-child(2n)]:pr-0 min-[940px]:border-r min-[940px]:border-ink/25 min-[940px]:pr-[26px] min-[940px]:[&:nth-child(2n)]:border-r min-[940px]:[&:nth-child(2n)]:pr-[26px] min-[940px]:[&:nth-child(3n)]:border-r-0 min-[940px]:[&:nth-child(3n)]:pr-0"
      style={{ ["--rv-delay" as string]: `${index * 60}ms` }}
    >
      <span className="font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-stamp">
        Exhibit {label}
      </span>
      <span className="mt-3 font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
        {project.company || "Selected Work"}
      </span>
      <h3 className="mt-2 min-h-[59px] font-display text-[28px] font-normal leading-[1.06] tracking-[-0.01em]">
        {project.title}
      </h3>

      <div className="mt-4">
        <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
          <span
            aria-hidden="true"
            className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
          />
          <div className="relative h-[176px] overflow-hidden border border-ink/40 bg-paper">
            <Image
              alt={project.title}
              src={imageUrl}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 940px) 50vw, 360px"
              className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(166,56,44,0.5)_0.7px,transparent_0.8px)] bg-[length:4px_4px] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 top-2.5 rotate-[8deg] scale-150 border-[3px] border-stamp bg-paper-bright/85 px-2.5 py-1 font-gothic text-[11px] font-black uppercase tracking-[0.18em] text-stamp opacity-0 transition-all duration-200 ease-out [filter:url(#fm-rough)] group-hover:-rotate-[8deg] group-hover:scale-100 group-hover:opacity-100"
            >
              Confirmed
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-1 py-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-soft">
            <span className="relative shrink-0 font-bold uppercase text-ink">
              Exhibit {label}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 44"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-1.5 -left-2 -right-3 -top-1.5 h-[calc(100%+12px)] w-[calc(100%+20px)]"
              >
                <path
                  d="M10 24 C 8 10, 44 4, 76 7 C 104 10, 116 18, 112 28 C 108 38, 70 42, 40 39 C 16 37, 8 30, 12 20"
                  fill="none"
                  stroke="#a6382c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.85"
                  pathLength={1}
                  className="rv-sketch"
                />
              </svg>
            </span>
            <span className="truncate">
              {project.url ? (
                <>recovered from {project.url.replace(/^https?:\/\/(www\.)?/, "")}</>
              ) : (
                <>recovered from the archive</>
              )}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3.5 mb-auto font-text text-[15px] leading-[1.55] text-ink-soft [hyphens:auto] [text-align:justify]">
        {project.description}
      </p>

      {stack.length > 0 && (
        <div className="mb-4 mt-[18px] flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech._id}
              className="inline-flex items-center gap-1.5 border border-ink bg-transparent px-2.5 py-[3px] font-mono text-[11px] font-medium text-ink"
            >
              {tech.title}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-ink/25 pt-3.5">
        <span className="font-mono text-xs text-ink-soft">
          {year ? `${year}` : "2024"}
        </span>
        <Link
          href={`/projects/${project.slug.current}`}
          className="group inline-flex items-center gap-1.5 border-b-[1.5px] border-stamp pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] text-stamp"
        >
          Open case file{" "}
          <span className="transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
