"use client";

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
    ? builder.image(project.image).width(600).height(400).url() 
    : "/file.svg";

  return (
    <div className="bg-white dark:bg-black border-4 border-black dark:border-white rounded-none shadow-brutal-lg dark:shadow-brutal-dark transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col h-full group">
      {/* Gambar Project */}
      <div className="relative w-full aspect-video border-b-4 border-black dark:border-white bg-accent overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-105"
        />
      </div>

      {/* Konten Teks */}
      <div className="p-6 flex flex-col flex-grow gap-4">
        <h3 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
          {project.title}
        </h3>
        
        <p className="text-sm font-medium text-black/80 dark:text-white/80 line-clamp-3 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        {project.stack && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech: any) => (
              <span 
                key={tech._id || tech.title} 
                className="px-2 py-1 text-xs font-bold uppercase bg-secondary text-black border-2 border-black dark:border-white rounded-none shadow-brutal-sm"
              >
                {tech.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tombol Aksi */}
      <div className="border-t-4 border-black dark:border-white p-4 bg-gray-50 dark:bg-zinc-900 grid grid-cols-2 gap-2">
        <Link
          href={`/projects/${project.slug.current}`}
          className="text-center py-2 bg-primary text-black font-black text-xs uppercase border-2 border-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          DETAILS →
        </Link>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-center py-2 bg-accent text-black font-black text-xs uppercase border-2 border-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            LIVE DEMO
          </a>
        ) : (
          <span className="text-center py-2 bg-gray-200 text-gray-500 font-bold text-xs uppercase border-2 border-gray-300 cursor-not-allowed">
            NO DEMO
          </span>
        )}
      </div>
    </div>
  );
}
