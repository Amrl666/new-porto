"use client";
import { Image as ImageType } from "@/sanity/lib/types/post";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

interface Props {
  images: ImageType[];
}

const builder = imageUrlBuilder(client);

function ImageSwiper({ images }: Props) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="border-2 border-black rounded-none"
    >
      {images.map((image, idx) => (
        <SwiperSlide key={`${image.alt}-${idx}`}>
          <Image
            className="object-center object-contain w-full"
            src={builder.image(image).width(1366).height(768).url()}
            alt={image?.alt}
            width={1366}
            height={768}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSwiper;
