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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 max-w-6xl mx-auto w-full pt-24">
        <div className="mb-16 text-center md:text-left">
          <div className="inline-block bg-primary px-6 py-3 border-4 border-black dark:border-white shadow-brutal-lg dark:shadow-brutal-dark -rotate-1 mb-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
              MY PROJECTS
            </h1>
          </div>
          <p className="text-lg md:text-xl font-bold border-l-4 border-black dark:border-white pl-4 max-w-xl mt-4">
            A collection of digital platforms, software architectures, and modules I&apos;ve engineered.
          </p>
        </div>

        {!projects ? (
          <div className="border-4 border-black dark:border-white p-12 text-center bg-white dark:bg-black animate-pulse">
            <p className="text-xl font-black uppercase">Loading...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="border-4 border-dashed border-black dark:border-white p-12 text-center bg-white dark:bg-black">
            <p className="text-xl font-black uppercase">No projects found. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
