"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { Technology } from "@/sanity/lib/types/technology";
import { motion, AnimatePresence } from "framer-motion";

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

interface Props {
  technologies: Technology[];
}

export default function TechnologyGrid({ technologies }: Props) {
  const [selected, setSelected] = useState<Technology | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selected]);

  return (
    <section className="mt-24 mb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="mb-10 w-fit mx-auto"
          initial={{ opacity: 0, y: -20, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white bg-accent px-6 py-2 border-4 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
            TECH STACK
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {technologies.map((t) => (
            <motion.div
              key={t._id}
              variants={itemVariants}
            >
              <div
                className="bg-white dark:bg-black border-4 border-black dark:border-white p-4 h-full flex flex-col items-center justify-center gap-4 shadow-brutal dark:shadow-brutal-dark hover:-translate-y-2 hover:translate-x-1 hover:shadow-brutal-lg hover:bg-primary transition-all cursor-pointer group"
                onClick={() => setSelected(t)}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white border-2 border-black dark:border-black p-2 group-hover:rotate-6 transition-transform">
                  <Image
                    className="object-contain"
                    src={
                      t.image
                        ? builder.image(t.image).width(150).format("png").url()
                        : FALLBACK_IMAGE
                    }
                    alt={t?.image?.alt || `${t.title} logo`}
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-center text-sm sm:text-base font-black uppercase text-black dark:text-white group-hover:text-black">
                  {t.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/95 will-change-transform"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >

            <motion.div 
              className="relative max-w-lg w-full bg-white dark:bg-black border-8 border-black dark:border-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-6 -right-6 w-12 h-12 bg-destructive border-4 border-black text-white font-black text-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-10"
                aria-label="Close"
              >
                X
              </button>

              <div className="flex gap-6 items-center mb-6 border-b-4 border-black dark:border-white pb-6">
                <div className="w-24 h-24 flex items-center justify-center border-4 border-black dark:border-white bg-secondary p-2 -rotate-3">
                  <Image
                    className="object-contain"
                    src={
                      selected.image
                        ? builder.image(selected.image).width(150).format("png").url()
                        : FALLBACK_IMAGE
                    }
                    alt={selected?.image?.alt || `${selected.title} logo`}
                    width={96}
                    height={96}
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase text-black dark:text-white leading-none">
                    {selected.title}
                  </h3>
                </div>
              </div>

              <div className="bg-primary/20 dark:bg-primary/10 border-2 border-black dark:border-white p-4">
                <p className="text-black dark:text-white font-medium text-lg leading-relaxed">
                  {selected.description || "No description provided. But it's a brutal tech anyway."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
