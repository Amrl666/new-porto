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
    ? builder.image(project.image).width(1200).height(600).url()
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 max-w-4xl mx-auto w-full pt-24">
        <Link
          href="/projects"
          className="inline-block mb-8 px-4 py-2 bg-white text-black font-black text-sm uppercase border-2 border-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all dark:bg-black dark:text-white dark:border-white"
        >
          ← BACK TO PROJECTS
        </Link>

      <article className="flex flex-col gap-8">
        {/* Judul Utama */}
        <header className="border-b-4 border-black dark:border-white pb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white leading-none mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl font-bold text-muted-foreground uppercase tracking-wide">
            {project.description}
          </p>
        </header>

        {/* Media / Gambar Utama */}
        <div className="border-4 border-black dark:border-white bg-white dark:bg-black shadow-brutal-lg dark:shadow-brutal-dark overflow-hidden p-2">
          {project.gallery && project.gallery.length > 0 ? (
            <ImageSwiper images={project.gallery} />
          ) : (
            mainImageUrl && (
              <div className="relative w-full aspect-video border-2 border-black">
                <Image
                  src={mainImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )
          )}
        </div>

        {/* Grid Informasi & Spesifikasi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-4">
          
          {/* Kolom Kiri: Detail & Tautan Teknis */}
          <div className="md:col-span-1 flex flex-col gap-6">
            
            {/* Box Tautan */}
            <div className="border-4 border-black dark:border-white p-4 bg-secondary text-black flex flex-col gap-3 shadow-brutal">
              <h3 className="font-black uppercase text-lg border-b-2 border-black pb-1">LINKS</h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-sm uppercase underline hover:text-white transition-colors"
                >
                  🌐 Live Production
                </a>
              )}
              {!project.url && (
                <p className="text-xs font-bold uppercase text-black/60">Repository is Private</p>
              )}
            </div>

            {/* Box Tech Stack */}
            <div className="border-4 border-black dark:border-white p-4 bg-accent text-black flex flex-col gap-2 shadow-brutal">
              <h3 className="font-black uppercase text-lg border-b-2 border-black pb-1">BUILT WITH</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.stack?.map((tech: any) => (
                  <span
                    key={tech._id}
                    className="px-2 py-1 bg-white text-black text-xs font-black uppercase border-2 border-black"
                  >
                    {tech.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Deskripsi Panjang */}
          <div className="md:col-span-2 border-4 border-black dark:border-white p-6 md:p-8 bg-white dark:bg-black shadow-brutal flex flex-col gap-4">
            <h3 className="text-2xl font-black uppercase bg-primary text-black w-fit px-3 py-1 border-2 border-black -rotate-1">
              PROJECT OVERVIEW
            </h3>
            {project.body ? (
              <div className="prose dark:prose-invert max-w-none font-medium leading-relaxed pt-2 text-black dark:text-white">
                <PortableText value={project.body} />
              </div>
            ) : (
              <p className="whitespace-pre-line font-medium text-black dark:text-white pt-2">
                {project.description}
              </p>
            )}
          </div>

        </div>
      </article>
      </main>
      <Footer />
    </div>
  );
}
