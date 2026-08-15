"use client";
import Navbar from "@/components/shared/navbar";
import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client, fetcher } from "@/sanity/lib/client";
import { Technology } from "@/sanity/lib/types/technology";
import { getAllTechnologies } from "@/sanity/lib/queries";
import Footer from "@/components/shared/footer";
import { motion, AnimatePresence } from "framer-motion";

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";

function Stack() {
  const [selected, setSelected] = useState<Technology | null>(null);
  const { data: technologies } = useSWR<Technology[]>(
    getAllTechnologies,
    fetcher
  );

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="mx-auto w-full max-w-[1180px] flex-grow px-5 pb-[76px] sm:px-[30px]">
        <div className="mb-[30px] pt-[30px]">
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>The Lab Report</span>
            <span>Filed under: Forensics</span>
          </div>
          <span className="block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
            Forensics
          </span>
          <h1 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
            The Lab Report
          </h1>
          <p className="mt-3 max-w-[42ch] font-text text-[15px] leading-[1.55] text-ink-soft">
            A detailed inventory of the substances detected on the subject — the
            languages, frameworks and tools reached for day to day.
          </p>
          <div className="rv rv-rule mt-5 h-1 bg-ink" />
        </div>

        {!technologies ? (
          <div className="border-2 border-ink p-12 text-center">
            <p className="font-gothic text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Running the analysis…
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[940px]:grid-cols-3">
            {technologies.map((t) => (
              <button
                key={t._id}
                onClick={() => setSelected(t)}
                className="group flex cursor-pointer flex-col items-center gap-4 border-2 border-ink bg-paper-bright p-6 text-left transition-colors hover:bg-paper-warm"
              >
                <div className="flex h-20 w-20 items-center justify-center border-2 border-ink bg-paper p-2 transition-transform group-hover:rotate-3">
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
                <div className="text-center">
                  <h3 className="font-display text-[22px] font-normal leading-[1.1] text-ink">
                    {t.title}
                  </h3>
                </div>
                <span className="font-gothic text-[10px] font-bold uppercase tracking-[0.14em] text-stamp">
                  Examine →
                </span>
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/90 px-4"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-lg border-2 border-ink bg-paper p-6 shadow-[8px_8px_0px_0px_rgba(166,56,44,1)]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center border-2 border-ink bg-stamp font-gothic text-sm font-black text-paper transition-transform hover:scale-110"
                aria-label="Close"
              >
                X
              </button>

              <div className="flex items-center gap-5 border-b-2 border-ink pb-5">
                <div className="flex h-20 w-20 items-center justify-center border-2 border-ink bg-paper p-2 -rotate-2">
                  <Image
                    className="object-contain"
                    src={
                      selected.image
                        ? builder.image(selected.image).width(150).format("png").url()
                        : FALLBACK_IMAGE
                    }
                    alt={selected?.image?.alt || `${selected.title} logo`}
                    width={80}
                    height={80}
                  />
                </div>
                <div>
                  <h3 className="font-display text-[30px] font-normal leading-none text-ink">
                    {selected.title}
                  </h3>
                </div>
              </div>

              <div className="mt-5 border-2 border-ink bg-paper-warm p-4">
                <p className="font-text text-[15px] leading-[1.6] text-ink">
                  {selected.description || "No description provided."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Stack;
