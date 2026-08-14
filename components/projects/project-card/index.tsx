import Link from "next/link";
import Image from "next/image";
import { Project } from "@/sanity/lib/types/project";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const imageUrl = project.image
    ? builder.image(project.image).width(600).url()
    : "/file.svg";
  const year = project.publishedAt
    ? new Date(project.publishedAt).getFullYear()
    : null;

  return (
    <article className="group relative flex h-full flex-col border-2 border-ink bg-paper-bright transition-colors hover:bg-paper-warm">
      {/* Image */}
      <div className="relative h-[176px] overflow-hidden border-b-2 border-ink bg-paper">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 940px) 50vw, 360px"
          className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-2.5 rotate-[8deg] scale-150 border-[3px] border-stamp bg-paper-bright/85 px-2.5 py-1 font-gothic text-[11px] font-black uppercase tracking-[0.18em] text-stamp opacity-0 transition-all duration-200 ease-out [filter:url(#fm-rough)] group-hover:-rotate-[8deg] group-hover:scale-100 group-hover:opacity-100"
        >
          Confirmed
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
          {project.company || "Selected Work"}
        </span>
        <h3 className="font-display text-[24px] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
          {project.title}
        </h3>
        <p className="line-clamp-3 flex-1 font-text text-[14px] leading-[1.55] text-ink-soft">
          {project.description}
        </p>

        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.slice(0, 4).map((tech: any) => (
              <span
                key={tech._id || tech.title}
                className="inline-flex items-center gap-1.5 border border-ink px-2.5 py-[3px] font-mono text-[11px] font-medium text-ink"
              >
                {tech.title}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/25 pt-3.5">
          <span className="font-mono text-xs text-ink-soft">
            {year ? `${year}` : "2024"}
          </span>
          <Link
            href={`/projects/${project.slug.current}`}
            className="group/link inline-flex items-center gap-1.5 border-b-[1.5px] border-stamp pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] text-stamp"
          >
            Open case file{" "}
            <span className="transition-transform duration-150 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
