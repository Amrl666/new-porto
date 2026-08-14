"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const builder = imageUrlBuilder(client);

interface GalleryImage {
  _key?: string;
  alt?: string | null;
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
}

interface Props {
  images: GalleryImage[];
  /** Used when a gallery image has no alt text of its own. */
  fallbackAlt?: string | null;
}

function ImageSwiper({ images, fallbackAlt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  return (
    <div className="relative h-full w-full bg-paper">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="project-swiper h-full w-full"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={image._key ?? idx}>
            <Image
              src={builder.image(image).width(1366).height(768).url()}
              alt={image?.alt?.trim() || fallbackAlt || "Project screenshot"}
              width={1366}
              height={768}
              priority={idx === 0}
              sizes="(max-width: 940px) 100vw, 1100px"
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {total > 1 && (
        <span className="pointer-events-none absolute right-3 top-3 z-10 border border-ink/25 bg-paper-bright/90 px-2 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] text-ink">
          Exhibit {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

export default ImageSwiper;
