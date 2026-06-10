"use client";
import React from "react";
import { Experience } from "@/sanity/lib/types/experience";
import { formatMMYY } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  experience: Experience[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

function ExperienceTimeline({ experience }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <motion.div 
        className="mb-12 w-fit"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white bg-primary px-4 py-2 border-4 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark -rotate-1 inline-block">
          EXPERIENCE
        </h2>
      </motion.div>

      <motion.ol 
        className="relative border-l-8 border-black dark:border-white ml-3 md:ml-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experience.map((exp, idx) => (
          <motion.li
            key={exp._id || `experience-${idx}`}
            className="mb-12 ml-8 md:ml-12 group"
            variants={itemVariants}
          >
            {/* Marker Kotak Brutalist */}
            <motion.div 
              className="absolute w-8 h-8 bg-secondary border-4 border-black dark:border-white -left-[20px] top-2 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            />

            {/* Kotak Konten Experience */}
            <div className="bg-white dark:bg-black border-4 border-black dark:border-white p-6 shadow-brutal-lg dark:shadow-brutal-dark transition-transform hover:-translate-y-1">
              <time className="inline-block mb-3 px-3 py-1 bg-accent border-2 border-black dark:border-white text-sm font-bold uppercase text-black">
                {formatMMYY(exp.startDate)} — {exp.endDate ? formatMMYY(exp.endDate) : "PRESENT"}
              </time>
              
              <h3 className="text-2xl font-black uppercase text-black dark:text-white mb-1">
                {exp.position}
              </h3>
              
              <h4 className="text-lg font-bold text-black/70 dark:text-white/70 mb-4 border-b-4 border-black dark:border-white pb-2 w-fit">
                @ {exp.company} <span className="text-sm">({exp.location})</span>
              </h4>
              
              <p className="text-base font-medium text-black dark:text-white leading-relaxed">
                {exp.summary}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

export default ExperienceTimeline;
