import { client } from "@/sanity/lib/client";
import { Project } from "@/sanity/lib/types/project";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { notFound } from "next/navigation";
import ImageSwiper from "@/components/projects/image-swiper";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const builder = imageUrlBuilder(client);

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    company,
    slug,
    description,
    image,
    gif,
    publishedAt,
    url,
    body,
    "stack": stack[]->{
      _id,
      title,
      description,
      image
    },
    "gallery": gallery[]{
      _key,
      asset->{
        _id,
        url
      },
      alt
    }
  }`;
  return await client.fetch(query, { slug });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const mainImageUrl = project.image
    ? builder.image(project.image).width(1200).url()
    : null;
  const year = project.publishedAt
    ? new Date(project.publishedAt).getFullYear()
    : null;
  const domain = project.url
    ? project.url.replace(/^https?:\/\/(www\.)?/, "")
    : project.company;

  return (
    <div className="min-h-screen bg-paper font-text text-ink">
      <Navbar />
      <main className="mx-auto w-full max-w-[1180px] px-5 pb-[76px] sm:px-[30px]">
        {/* Case file header */}
        <div className="mb-[30px] pt-[30px]">
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>Case File</span>
            <span>Filed under: Selected Works</span>
          </div>

          <Link
            href="/#work"
            className="group inline-flex items-center gap-1.5 border-b-[1.5px] border-ink pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] text-ink"
          >
            <span className="transition-transform duration-150 group-hover:-translate-x-1">
              ←
            </span>{" "}
            Back to the evidence
          </Link>

          <span className="mt-5 block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-stamp">
            Exhibit on record
          </span>
          <span className="mt-3 block font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
            {project.company || "Selected Work"}
            {year ? ` · ${year}` : ""}
          </span>
          <h1 className="mt-2 font-display text-[clamp(36px,6vw,72px)] font-normal leading-[1.02] tracking-[-0.015em]">
            {project.title}
          </h1>
          <div className="rv rv-rule mt-5 h-1 bg-ink" />
        </div>

        <article className="flex flex-col gap-8">
          {/* Media */}
          <div className="rv rv-develop">
            <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
              />
              <div className="relative aspect-video overflow-hidden border border-ink/40 bg-paper">
                {project.gallery && project.gallery.length > 0 ? (
                  <ImageSwiper
                    images={project.gallery}
                    fallbackAlt={project.title}
                  />
                ) : mainImageUrl ? (
                  <Image
                    src={mainImageUrl}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 940px) 100vw, 1100px"
                    className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply dark:mix-blend-normal"
                  />
                ) : (
                  <div className="flex h-full min-h-[240px] items-center justify-center font-gothic text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    No photograph on record
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 px-1 py-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-soft">
                <span className="relative shrink-0 font-bold uppercase text-ink">
                  Exhibit · {project.slug.current}
                </span>
                <span className="truncate">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pencil"
                    >
                      {domain}
                    </a>
                  ) : (
                    <>recovered from the archive</>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 min-[940px]:grid-cols-[1.55fr_1fr]">
            {/* Body */}
            <div className="rv rv-settle font-text text-[17px] leading-[1.6]">
              <p className="mb-4 border-l-4 border-ink pl-[18px] font-text text-[clamp(18px,2vw,23px)] italic leading-[1.45] text-ink-soft">
                {project.description}
              </p>
              {project.body ? (
                <div className="max-w-none [hyphens:auto] [text-align:justify]">
                  <PortableText value={project.body} />
                </div>
              ) : (
                <p className="text-ink-soft">{project.description}</p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="rv rv-settle flex flex-col gap-6">
              {/* Links */}
              <div className="border-2 border-ink bg-paper-bright">
                <h3 className="border-b-2 border-ink px-4 py-[11px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                  Links
                </h3>
                <div className="flex flex-col gap-3 px-4 py-4">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pencil w-fit font-text text-[15px] text-ink"
                    >
                      Live production →
                    </a>
                  ) : (
                    <p className="font-gothic text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                      Repository &amp; link pending
                    </p>
                  )}
                </div>
              </div>

              {/* Stack */}
              {project.stack && project.stack.length > 0 && (
                <div className="border-2 border-ink bg-paper-bright">
                  <h3 className="border-b-2 border-ink px-4 py-[11px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                    Built with
                  </h3>
                  <div className="flex flex-wrap gap-1.5 px-4 py-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech._id}
                        className="inline-flex items-center gap-1.5 border border-ink bg-transparent px-2.5 py-[3px] font-mono text-[11px] font-medium text-ink"
                      >
                        {tech.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="border-2 border-ink bg-paper-warm">
                <h3 className="border-b-2 border-ink px-4 py-[11px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                  Docket
                </h3>
                <div className="flex flex-col gap-2 px-4 py-4 font-mono text-[12px] text-ink-soft">
                  <span>
                    Filed:{" "}
                    <b className="font-bold text-ink">
                      {year ? `${year}` : "2024"}
                    </b>
                  </span>
                  <span>
                    Client:{" "}
                    <b className="font-bold text-ink">
                      {project.company || "—"}
                    </b>
                  </span>
                  <span>
                    Status:{" "}
                    <b className="font-bold text-ink">On the record</b>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
