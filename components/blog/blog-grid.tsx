"use client";
import { motion } from "framer-motion";
import { Post } from "@/sanity/lib/types/post";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { formatMMYY } from "@/lib/utils";

const builder = imageUrlBuilder(client);

interface Props {
  posts: Post[];
}

export default function BlogGrid({ posts }: Props) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {posts.map((post) => {
        const imageUrl = post.mainImage
          ? builder.image(post.mainImage).width(600).height(400).url()
          : "/file.svg";

        return (
          <motion.div
            key={post._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
          >
            <article 
              className="bg-white dark:bg-black border-4 border-black dark:border-white rounded-none shadow-brutal-lg dark:shadow-brutal-dark flex flex-col h-full transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] group"
            >
              <div className="relative w-full aspect-[16/9] border-b-4 border-black dark:border-white overflow-hidden bg-accent">
                <Image
                  src={imageUrl}
                  alt={post.title || "Blog post"}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 border-2 border-black font-bold text-xs uppercase text-black">
                  {post.publishedAt ? formatMMYY(post.publishedAt) : "RECENT"}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow gap-3">
                <h2 className="text-2xl font-black uppercase tracking-tight leading-tight text-black dark:text-white">
                  <Link href={`/blog/${post.slug.current}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm font-medium text-black/80 dark:text-white/80 line-clamp-3 leading-relaxed flex-grow">
                  {post.description || "Click details to read the full comprehensive breakdown of this topic."}
                </p>
                
                <div className="pt-4 mt-auto">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-block w-full text-center py-2 bg-accent text-black font-black text-sm uppercase border-2 border-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    READ ARTICLE →
                  </Link>
                </div>
              </div>
            </article>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
