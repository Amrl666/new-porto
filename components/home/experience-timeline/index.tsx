"use client";
import React, { useRef, useState, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [markerTop, setMarkerTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || cardRefs.current.length < 2) return;

      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // progress 0 ketika container mulai masuk viewport, 1 ketika habis
      const totalScrollDist = rect.height + viewportH;
      const scrolled = viewportH - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDist));

      // posisi Y marker: interpolasi dari ujung atas ke ujung bawah garis
      const firstEl = cardRefs.current[0];
      const lastEl = cardRefs.current[cardRefs.current.length - 1];
      if (!firstEl || !lastEl) return;

      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();

      // ujung atas garis = top card pertama, ujung bawah = bottom card terakhir
      const lineTop = firstRect.top - rect.top;
      const lineBottom = lastRect.bottom - rect.top;
      const startY = lineTop - 16;
      const endY = lineBottom - 16;

      const markerY = startY + (endY - startY) * progress;
      setMarkerTop(markerY);

      // card aktif: deteksi posisi marker sedang di card mana
      const markerCenter = markerY + 16;
      let activeIdx = 0;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const cardRect = el.getBoundingClientRect();
        const cardTop = cardRect.top - rect.top;
        const cardBottom = cardRect.bottom - rect.top;
        if (markerCenter >= cardTop && markerCenter <= cardBottom) {
          activeIdx = i;
        }
      });
      setActiveIndex(activeIdx);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <motion.div 
        className="mb-12 w-fit"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white bg-primary px-4 py-2 border-4 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark -rotate-1 inline-block">
          EXPERIENCE
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative ml-3 md:ml-0">
        {/* Marker Kotak Brutalist — animasi mengikuti scroll */}
        <div
          className={`absolute w-8 h-8 bg-secondary border-4 border-black dark:border-white -left-[8px] z-10 transition-all duration-150 ease-linear ${
            activeIndex >= 0
              ? "-translate-x-2 -translate-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              : ""
          }`}
          style={{ top: markerTop, willChange: "top" }}
        />

        <motion.ol
          className="relative border-l-8 border-black dark:border-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experience.map((exp, idx) => (
            <motion.li
              key={exp._id || `experience-${idx}`}
              className="mb-12 ml-8 md:ml-12"
              variants={itemVariants}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
            >
              {/* Kotak Konten Experience */}
              <div
                className={`bg-white dark:bg-black border-4 border-black dark:border-white p-6 shadow-brutal-lg dark:shadow-brutal-dark transition-all duration-300 hover:-translate-y-2 ${
                  activeIndex === idx ? "-translate-y-2" : ""
                }`}
              >
                <time className="inline-block mb-3 px-3 py-1 bg-accent border-2 border-black dark:border-white text-sm font-bold uppercase text-black">
                  {formatMMYY(exp.startDate)} —{" "}
                  {exp.endDate ? formatMMYY(exp.endDate) : "PRESENT"}
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
    </div>
  );
}

export default ExperienceTimeline;
