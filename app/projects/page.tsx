"use client";
import React from "react";
import useSWR from "swr";
import { getProjects } from "@/sanity/lib/queries";
import { fetcher } from "@/sanity/lib/client";
import { Project } from "@/sanity/lib/types/project";
import ProjectCard from "@/components/projects/project-card";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

function Projects() {
  const { data: projects } = useSWR<Project[]>(getProjects, fetcher);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main className="mx-auto w-full max-w-[1180px] flex-grow px-5 pb-[76px] sm:px-[30px]">
        <div className="mb-[30px] pt-[30px]">
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>Selected Works</span>
            <span>Filed under: The Evidence</span>
          </div>
          <span className="block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
            The Evidence
          </span>
          <h1 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
            Selected Works
          </h1>
          <p className="mt-3 max-w-[42ch] font-text text-[15px] leading-[1.55] text-ink-soft">
            A collection of digital platforms, software systems and data
            explorations — engineered front to back.
          </p>
          <div className="rv rv-rule mt-5 h-1 bg-ink" />
        </div>

        {!projects ? (
          <div className="border-2 border-ink p-12 text-center">
            <p className="font-gothic text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Dusting off the files…
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="border-2 border-dashed border-ink p-12 text-center">
            <p className="font-display text-[28px]">No exhibits filed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 min-[600px]:grid-cols-2 min-[940px]:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Projects;
